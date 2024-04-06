'use server'

import { z } from 'zod';
import { storeObjetivo, updateObjetivo } from '@/app/lib/data';

const SCHEMA_OBJETIVO = z.object({
    titulo: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    dificultad: z.number().positive().lte(5),
    importancia: z.number().positive().lte(3),
    completado: z.boolean().nullable()
})


export async function addObjetivo(idUser, prevState, formData) {    console.log(idUser)
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
        return {
            success: true,
            data: {
                ...result.data(),
                id: result.id,
                path: result.path
            }
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
        return {
            success: true,
            data: {
                ...result.data(),
                id: result.id,
                path: result.path
            }
        }


    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación del objetivo.'
        }
    }

}