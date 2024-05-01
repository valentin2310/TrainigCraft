import { z } from 'zod'
import { destroyItem, storeEjercicio, updateEjercicio } from '@/app/lib/data'

const SCHEMA_EJERCICIO = z.object({
    nombre: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    dificultad: z.number().positive().lte(5),
    musculos: z.array(z.string()).nullable(),
    imgUrl: z.string().nullable()
})

function formatEjercicio(docSnapshot) {
    console.log(docSnapshot)
    const {created_at, ...rest} = docSnapshot.data()
    const formatedDate = new Date(created_at.seconds * 1000 + created_at.nanoseconds / 1000000).toISOString();
    
    return {
        ...rest,
        created_at: formatedDate,
        id: docSnapshot.id,
        path: docSnapshot.ref.path
    }
}

export async function addEjercicio(idUser, prevState, formData) {
    if(!idUser) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    const rawData = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        dificultad: formData.get('dificultad') ? parseInt(formData.get('dificultad')) : null,
        musculos: formData.getAll('musculos[]'),
        imgUrl: formData.get('imgUrl')
    }

    console.log(rawData)

    const validatedFields = SCHEMA_EJERCICIO.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await storeEjercicio(idUser, validatedFields.data);
        const formatedData = formatEjercicio(result)

        return {
            success: true,
            data: formatedData
        }

    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación del objetivo.'
        }
    }

}

export async function editEjercicio(path, prevState, formData) {
    if(!path) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    const rawData = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        dificultad: formData.get('dificultad') ? parseInt(formData.get('dificultad')) : null,
        musculos: formData.getAll('musculos[]')
    }

    console.log(rawData)

    const validatedFields = SCHEMA_EJERCICIO.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await updateEjercicio(path, validatedFields.data);
        console.log(result)

        const formatedData = formatEjercicio(result)


        return {
            success: true,
            data: formatedData
        }

    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación del objetivo.'
        }
    }

}

export async function deleteEjercicio(path) {
    if(!path) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    // Elimina los datos en firestore
    try {
        const result = await destroyItem(path);

        return {
            success: result
        }
        
    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la eliminación del objetivo.'
        }
    }
}