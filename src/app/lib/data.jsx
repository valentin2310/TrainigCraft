import { firestore as db, auth } from '@/firebase/config'
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp, orderBy, limit, updateDoc, deleteDoc } from 'firebase/firestore'
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
    /* const data = [] */

    const rutinasColl = collection(db, 'rutinas')
    const data = await fetchCollectionData(rutinasColl)
    return data;

}

export function fetchRutinas(idUser) {
    const userRef = doc(db, "usuarios", idUser)
    const rutinasCollectionRef = collection(db, "rutinas")

    const q = query(rutinasCollectionRef, where("usuario", "==", userRef))
    fetchCollectionData(q)
        .then((data) => {
            return data
        });
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
            created_at: Timestamp.now(),
            fecha_completado: data.completado ? Timestamp.now() : null,
        })

        const result = await getDoc(objetivo);
        return result;

    } catch (err) {
        console.log(err)
        return null
    }

}

export async function destroyObjetivo(path) {
    const objetivo = doc(db, path)

    try {
        await deleteDoc(objetivo)
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