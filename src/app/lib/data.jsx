import { firestore as db } from '@/firebase/config'
import { collection, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore'
import { generateFromEmail } from 'unique-username-generator'

const miIdUsuario = "qooTrBxEKNd25EDIDLE2";

export async function addUsuarioFromLogin(user) {
    if (await userExist(user.uid)) return null

    const userRef = doc(db, "usuarios", user.uid);
    const randomUsername = generateFromEmail(user.email, 3)


    try {
        const docRef = await setDoc(userRef, {
            usuario: randomUsername,
            passwd: null,
            nombre: user.displayName,
            experiencia: 0,
            created_at: new Date().getTime(),
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

async function userExist(uid) {
    const ref = doc(db, "usuarios", uid)
    const snapshot = await getDoc(ref)

    if(snapshot.exists()) {
        return true
    }

    return false
}

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