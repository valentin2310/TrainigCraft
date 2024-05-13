import { z } from 'zod'
import { destroyItem, storeRutina, updateRutina } from '@/app/lib/data'

const SCHEMA_RUTINA = z.object({
    titulo: z.string().trim().min(3),
    descripcion: z.string().trim().nullable(),
    categorias: z.array(z.string()).nullable(),
    ejercicios: z.array(z.any()).nonempty()
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

export async function addRutina(params, prevState, formData) {
    if(!params.idUser) {
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
        ejercicios: addOrderToEjercicios(params.list.map((item) => {
            const {ejercicio, ...rest} = item
            return {
                ...rest,
                ejercicioData: {
                    id: ejercicio.id,
                    path: ejercicio.path,
                    isDefault: ejercicio.path.includes('ejercicios-default')
                }
            }
        }))
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
        const result = await storeRutina(params.idUser, validatedFields.data);
        const formatedData = formatRutina(result)

        return {
            success: true,
            data: formatedData
        }

    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación de la rutina.'
        }
    }

}

export async function editRutina(params, prevState, formData) {
    if(!params.path) {
        return{
            errors: {
                'user' : 'Usuario no existe'
            }
        }
    }

    console.log(params)

    const rawData = {
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        categorias: formData.getAll('categorias[]'),
        ejercicios: addOrderToEjercicios(params.list.map((item) => {
            const {ejercicio, ...rest} = item
            if (item.ejercicioData) return {...rest}
            return {
                ...rest,
                ejercicioData: {
                    id: ejercicio.id,
                    path: ejercicio.path,
                    isDefault: ejercicio.path.includes('ejercicios-default')
                }
            }
        }))
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
        const result = await updateRutina(params.path, validatedFields.data);
        const formatedData = formatRutina(result)

        return {
            success: true,
            data: formatedData
        }

    } catch (err) {
        console.log(err)
        return {
            message: 'Ups.. Hubo un error en la creación de la rutina.'
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

function addOrderToEjercicios(list) {
    list.forEach((item, index) => {
        item.orden = index
    })

    return list;
}