import { firestore as db } from '@/firebase/config'
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'

const miIdUsuario = "qooTrBxEKNd25EDIDLE2";

// Funcion para leer una colección
async function fetchCollectionData(collectionRef) {
    const snapshot = await getDocs(collectionRef)
    const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))

    return data
}

export async function fetchUserData(idUser = miIdUsuario) {
    const ref = doc(db, "usuarios", idUser)
    const snapshot = await getDoc(ref)

    if(snapshot.exists()) {
        return snapshot.data()
    }

    return null
}

export async function fetchUserRutinas(idUser = miIdUsuario) {
    const userRef = doc(db, "usuarios", idUser)
    const rutinasCollectionRef = collection(db, "rutinas")

    const q = query(rutinasCollectionRef, where("usuario", "==", userRef))
    const data = await fetchCollectionData(q);

    return data;
}