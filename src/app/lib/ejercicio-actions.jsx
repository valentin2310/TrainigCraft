import { z } from 'zod'
import { storeEjercicio, updateEjercicio } from '@/app/lib/data'

const SCHEMA_EJERCICIO = z.object({
    nombre: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    dificultad: z.number().positive().lte(5),
    musculos: z.array(z.string()).nullable()
})

function formatEjercicio(docSnapshot) {
    const {created_at, ...rest} = docSnapshot.data()
    const formatedDate = new Date(created_at.seconds * 1000 + created_at.nanoseconds / 1000000).toISOString();
    
    return {
        ...rest,
        created_at: formatedDate,
        id: docSnapshot.id,
        path: docSnapshot.path
    }
}

export async function addEjercicio(prevState, formData) {
    /* if(!idUser) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    } */

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
        const result = await storeEjercicio(validatedFields.data);
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
        const result = await updateEjercicio(validatedFields.data);
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
