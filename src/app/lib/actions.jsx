'use server'

import { z } from 'zod';
import { storeUserObjetivo } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SCHEMA_OBJETIVO = z.object({
    titulo: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    dificultad: z.number().positive().lte(5),
    importancia: z.number().positive().lte(3)
})


export async function addUserObjetivo(idUser, prevState, formData) {
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
    }

    const validatedFields = SCHEMA_OBJETIVO.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const newObjetivo = await storeUserObjetivo(idUser, validatedFields.data);
        console.log(newObjetivo.id)

    } catch (err) {
        return {
            message: 'Ups.. Hubo un error en la creación del objetivo.'
        }
    }

}