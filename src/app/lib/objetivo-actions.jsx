import { z } from 'zod';
import { destroyItem, storeObjetivo, updateObjetivo } from '@/app/lib/data';

const SCHEMA_OBJETIVO = z.object({
    titulo: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    dificultad: z.number().positive().lte(5),
    importancia: z.number().positive().lte(3),
    completado: z.boolean().nullable()
})

function formatObjetivo(docSnapshot) {
    const {created_at, ...rest} = docSnapshot.data()
    const formatedDate = new Date(created_at.seconds * 1000 + created_at.nanoseconds / 1000000).toISOString();

    return {
        ...rest,
        created_at: formatedDate,
        id: docSnapshot.id,
        path: docSnapshot.ref.path
    }
}

export async function addObjetivo(idUser, prevState, formData) {
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
        dificultad: formData.get('dificultad') ? parseInt(formData.get('dificultad')) : null,
        importancia: formData.get('importancia') ? parseInt(formData.get('importancia')) : null,
        completado: null
    }

    const validatedFields = SCHEMA_OBJETIVO.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await storeObjetivo(idUser, validatedFields.data);
        const formatedData = formatObjetivo(result)

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

export async function editObjetivo(path, prevState, formData) {
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
        dificultad: formData.get('dificultad') ? parseInt(formData.get('dificultad')) : null,
        importancia: formData.get('importancia') ? parseInt(formData.get('importancia')) : null,
        completado: formData.get('completado'),
    }

    const validatedFields = SCHEMA_OBJETIVO.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await updateObjetivo(path, validatedFields.data);
        const formatedData = formatObjetivo(result)

        return {
            success: true,
            data: formatedData
        }


    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la actualización del objetivo.'
        }
    }

}

export async function deleteObjetivo(path) {
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