import { firestore as db, auth } from '@/firebase/config'
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp } from 'firebase/firestore'
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

export function fetchUserRutinas(idUser) {
    const userRef = doc(db, "usuarios", idUser)
    const rutinasCollectionRef = collection(db, "rutinas")

    const q = query(rutinasCollectionRef, where("usuario", "==", userRef))
    fetchCollectionData(q)
        .then((data) => {
            return data
        });
}

export async function fetchUserObjetivos(idUser) {
    const objetivosColl = collection(db, `usuarios/${idUser}/objetivos`)
    const result = await fetchCollectionData(objetivosColl)

    return result;
}

export async function storeUserObjetivo(idUser, data) {
    const objetivosColl = collection(db, `usuarios/${idUser}/objetivos`)
    const docRef = await addDoc(objetivosColl, {
        ...data,
        created_at: Timestamp.now(),
        fecha_completado: null,
    })

    return docRef;
}