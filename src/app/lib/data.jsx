import { firestore as db, auth } from '@/firebase/client-config'
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp, orderBy, limit, updateDoc, deleteDoc, runTransaction, documentId } from 'firebase/firestore'
import { generateFromEmail } from 'unique-username-generator'

export async function addUsuarioFromLogin(user) {
    if (await getUser(user.uid)) return null

    const userRef = doc(db, "usuarios", user.uid);
    const randomUsername = generateFromEmail(user.email, 3)


    try {
        const docRef = await setDoc(userRef, {
            usuario: randomUsername,
            passwd: null,
            nombre: user.displayName,
            experiencia: 0,
            created_at: Timestamp.now(),
            correo: user.email,
            avatar: null,
            photoUrl: user.photoURL
        })

        return docRef;

    } catch(error) {
        console.log(error)
        return null
    }

}

export async function getUser(uid) {
    if (!uid) return null;
    
    const ref = doc(db, "usuarios", uid)
    const snapshot = await getDoc(ref)

    if(snapshot.exists()) {
        return {
            ...snapshot.data(),
            id: uid
        }
    }

    return false
}

// Funcion para leer una colección
async function fetchCollectionData(collectionRef) {
    const snapshot = await getDocs(collectionRef)
    const data = [];

    snapshot.forEach((doc) => {
        const docRef = doc.ref
        const path = docRef.path

        data.push({
            ...doc.data(),
            id: doc.id,
            path: path
        })
    })

    return data
}

async function fetchCollectionDataWithId(collectionRef) {
    const snapshot = await getDocs(collectionRef)
    const data = [];

    snapshot.forEach((doc) => {
        const docRef = doc.ref

        data.push({
            ...doc.data(),
            id: doc.id,
        })
    })

    return data
}

async function fetchCollectionDataPlain(collectionRef) {
    const snapshot = await getDocs(collectionRef)
    const data = [];

    snapshot.forEach((doc) => {
        const docRef = doc.ref

        data.push({
            ...doc.data(),
        })
    })

    return data
}

export async function fetchMusculos() {
    try {
        const collectionRef = collection(db, 'musculos')
        const data = await fetchCollectionData(collectionRef)
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function fetchDefaultEjercicios() {
    try {
        const collectionRef = collection(db, 'ejercicios-default')
        const data = await fetchCollectionData(collectionRef)
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function fetchDefaultRutinas() {
    try {
        const collectionRef = collection(db, 'rutinas')
        const data = await fetchCollectionData(collectionRef)
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function fetchRutinas(idUser) {
    try {
        const collectionRef = collection(db, `usuarios/${idUser}/rutinas`)
        const data = await fetchCollectionData(collectionRef)
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function fetchCategorias(idUser) {
    try {
        const collectionRef = collection(db, `usuarios/${idUser}/categorias`)
        const data = await fetchCollectionData(collectionRef)
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function fetchObjetivosSinCompletar(idUser, limite = 10) {
    const objetivosColl = collection(db, `usuarios/${idUser}/objetivos`)
    const q = query(objetivosColl, where("fecha_completado", "==", null), limit(limite))

    const data = await fetchCollectionData(q)
    return data;
}

export async function fetchObjetivos(idUser, limite) {
    try {
        const objetivosColl = collection(db, `usuarios/${idUser}/objetivos`)
        const q = query(objetivosColl, orderBy("importancia", "desc"), limit(limite))
    
        const data = await fetchCollectionData(q)
        return data

    } catch (error) {
        console.log(error)
        return []
    }
}

export async function storeObjetivo(idUser, data) {
    const objetivosColl = collection(db, `usuarios/${idUser}/objetivos`)

    try {
        const docRef = await addDoc(objetivosColl, {
            ...data,
            created_at: Timestamp.now(),
            fecha_completado: null,
        })
        
        const result = await getDoc(docRef)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }

}

export async function updateObjetivo(path, data) {
    const objetivo = doc(db, path)

    try {
        await updateDoc(objetivo, {
            ...data,
            fecha_completado: data.completado ? Timestamp.now() : null,
        })

        const result = await getDoc(objetivo);
        return result;

    } catch (err) {
        console.log(err)
        return null
    }

}

export async function destroyItem(path) {
    const item = doc(db, path)

    try {
        await deleteDoc(item)
        return true
        
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function storeEjercicio(data) {
    const collectionRef = collection(db, `ejercicios-default`)

    try {
        const docRef = await addDoc(collectionRef, {
            ...data,
            created_at: Timestamp.now(),
        })
        
        const result = await getDoc(docRef)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

export async function updateEjercicio(path, data) {
    const ejercicio = doc(db, path);

    try {
        await updateDoc(ejercicio, {
            ...data,
        })
        
        const result = await getDoc(ejercicio)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

export async function storeRutina(idUser, data) {
    const collectionRef = collection(db, `usuarios/${idUser}/rutinas`)
    const collectionCatRef = collection(db, `usuarios/${idUser}/categorias`)

    try {
        const { categorias, ...rest } = data
        const dataCategorias = await getCategoriasFromId(collectionCatRef, categorias)

        const docRef = await addDoc(collectionRef, {
            ...rest,
            categorias: dataCategorias,
            created_at: Timestamp.now(),
            sesiones: 0
        })

        const result = await getDoc(docRef)
        
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

export async function updateRutina(path, data) {
    try {
        const rutina = doc(db, path)
        const user = rutina.parent.parent

        const collectionCatRef = collection(db, `usuarios/${user.id}/categorias`)
        
        const { categorias, ...rest } = data
        const dataCategorias = await getCategoriasFromId(collectionCatRef, categorias)
        
        await updateDoc(rutina, {
            ...rest,
            categorias: dataCategorias,
        })
        
        const result = await getDoc(rutina)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

async function getCategoriasFromId(collection, categorias) {
    if (!categorias || categorias.length == 0) return []

    try {
        const queryCategorias = query(collection, where(documentId(), "in", categorias))
        const dataCategorias = await fetchCollectionDataWithId(queryCategorias)
        
        return dataCategorias;
    
    } catch (error) {
        console.log(error)
        return []
    }

}