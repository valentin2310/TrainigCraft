import { z } from 'zod'
import { destroyItem, storeRutina, updateRutina } from '@/app/lib/data'

const SCHEMA_RUTINA = z.object({
    titulo: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    categorias: z.array(z.string()).nullable(),
    ejercicios: z.array(z.string()).nonempty()
})

function formatRutina(docSnapshot) {
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

export async function addRutina(idUser, prevState, formData) {
    if(!idUser) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    const rawData = {
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        categorias: formData.getAll('categorias[]'),
        ejercicios: formData.getAll('ejercicios[]')
    }

    console.log(rawData)

    const validatedFields = SCHEMA_RUTINA.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await storeRutina(idUser, validatedFields.data);
        const formatedData = formatRutina(result)

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

export async function editRutina(path, prevState, formData) {
    if(!path) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    const rawData = {
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        categorias: formData.getAll('categorias[]'),
    }

    console.log(rawData)

    const validatedFields = SCHEMA_RUTINA.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await updateRutina(path, validatedFields.data);
        const formatedData = formatRutina(result)

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

export async function deleteRutina(path) {
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