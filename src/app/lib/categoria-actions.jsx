import { z } from 'zod'
import { destroyItem, storeCategoria, storeRutina, updateCategoria, updateRutina } from '@/app/lib/data'

const SCHEMA_CATEGORIA = z.object({
    nombre: z.string().trim().min(1),
    color: z.string().trim().nullable(),
})

function formatCategoria(docSnapshot) {
    console.log(docSnapshot)
    
    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
        path: docSnapshot.ref.path
    }
}

export async function addCategoria(params, prevState, formData) {
    console.log(params)
    if(!params.idUser) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    const rawData = {
        nombre: formData.get('nombre'),
        color: formData.get('color'),
    }

    console.log(rawData)

    const validatedFields = SCHEMA_CATEGORIA.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await storeCategoria(params.idUser, validatedFields.data);
        const formatedData = formatCategoria(result)

        return {
            success: true,
            data: formatedData
        }

    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación.'
        }
    }

}

export async function editCategoria(params, prevState, formData) {
    if(!params.path) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    console.log(params)

    const rawData = {
        nombre: formData.get('nombre'),
        color: formData.get('color'),
    }

    console.log(rawData)

    const validatedFields = SCHEMA_CATEGORIA.safeParse(rawData)

    if (!validatedFields.success) {
        return{
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Guardar los datos en firestore
    try {
        const result = await updateCategoria(params.path, validatedFields.data);
        const formatedData = formatCategoria(result)

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

export async function deleteCategoria(path) {
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