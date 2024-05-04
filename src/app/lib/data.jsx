import { firestore as db, auth } from '@/firebase/client-config'
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp, orderBy, limit, updateDoc, deleteDoc, runTransaction, documentId, writeBatch } from 'firebase/firestore'
import { generateFromEmail } from 'unique-username-generator'
import { urlToBlob } from './utils';
import { subirImg } from './data-storage';

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
    try {
        const snapshot = await getDocs(collectionRef)

        if (snapshot.empty) return []

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
        
    } catch (error) {
        console.log(error)
        return []
    }
}

async function fetchCollectionDataWithId(collectionRef) {
    try {
        const snapshot = await getDocs(collectionRef)

        if (snapshot.empty) return []

        const data = [];
    
        snapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id,
            })
        })
    
        return data

    } catch (error) {
        console.log(error)
        return []
    }
}

async function fetchCollectionDataPlain(collectionRef) {
    try {
        const snapshot = await getDocs(collectionRef)

        if (snapshot.empty) return []

        const data = [];
    
        snapshot.forEach((doc) => {
    
            data.push({
                ...doc.data(),
            })
        })
    
        return data
        
    } catch (error) {
        console.log(error)
        return []
    }
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

export async function fetchEjercicios(idUser) {
    try {
        const collectionRef = collection(db, `usuarios/${idUser}/ejercicios`)
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

export async function fetchItem(path) {
    try {
        const docRef = doc(db, path);
        const result = await getDoc(docRef)

        return {
            ...result.data(),
            path: path,
            id: result.id
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

/* #region crud objetivos */

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

/* #region Destroy Item */

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

/* #region crud ejercicios */

export async function storeEjercicioDefault(data) {
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

export async function storeEjercicio(idUser, data) {
    const collectionRef = collection(db, `usuarios/${idUser}/ejercicios`)

    try {
        const {imgUrl, ...restData} = data
        let uploadedUrl;

        if (imgUrl) {
            const blob = await urlToBlob(imgUrl)
            uploadedUrl = await subirImg(idUser, blob)
        }

        const docRef = await addDoc(collectionRef, {
            ...restData,
            ...(imgUrl && { imgPath: uploadedUrl }),
            created_at: Timestamp.now(),
        })
        
        const result = await getDoc(docRef)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

export async function updateEjercicioDefault(path, data) {
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

export async function updateEjercicio(path, data) {
    const ejercicio = doc(db, path);
    const idUser = path.split("/")[1]

    try {
        const {imgUrl, ...restData} = data
        let uploadedUrl;

        if (imgUrl) {
            const blob = await urlToBlob(imgUrl)
            uploadedUrl = await subirImg(idUser, blob)
        }

        await updateDoc(ejercicio, {
            ...restData,
            ...(imgUrl && { imgPath: uploadedUrl })
        })
        
        const result = await getDoc(ejercicio)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

/* #region crud rutina */

export async function storeRutina(idUser, data) {
    const collectionRef = collection(db, `usuarios/${idUser}/rutinas`)
    const collectionCatRef = collection(db, `usuarios/${idUser}/categorias`)

    try {
        const { categorias, ejercicios, ...rest } = data
        const dataCategorias = await getCategoriasFromId(collectionCatRef, categorias)

        const docRef = await addDoc(collectionRef, {
            ...rest,
            categorias: dataCategorias,
            created_at: Timestamp.now(),
            sesiones: 0
        })

        const result = await getDoc(docRef)
        await setEjerciciosToRutina(docRef.path, ejercicios)
        
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
        
        const { categorias, ejercicios, ...rest } = data
        const dataCategorias = await getCategoriasFromId(collectionCatRef, categorias)
        
        await updateDoc(rutina, {
            ...rest,
            categorias: dataCategorias,
        })
        
        const result = await getDoc(rutina)
        await setEjerciciosToRutina(path, ejercicios)

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

async function setEjerciciosToRutina(rutinaPath, ejercicios){
    if (!ejercicios || ejercicios.length == 0) return

    try {
        /* La collection de ejercicios de la rutina */
        const collectionEjRutina = collection(db, rutinaPath, "ejercicios");

         /* Crear lote de escritura */
        const batch = writeBatch(db);

        /* Limpiar la collection */
        const ejerciciosExistentes = await fetchCollectionData(collectionEjRutina);
        ejerciciosExistentes.forEach((item) => {
            const docRef = doc(db, item.path)
            batch.delete(docRef)
        })

        /* Guardarlo */
        ejercicios.forEach((item) => {
            const docRef = doc(collectionEjRutina);
            batch.set(docRef, item)
        })

        /* Hacer commit del batch */
        await batch.commit()

    } catch (error) {
        console.log(error)
    }
}

export async function fetchEjerciciosRutina(rutinaPath) {
    if (!rutinaPath) return

    try {
        const collectionRef = collection(db, rutinaPath, "ejercicios");
        const q = query(collectionRef, orderBy('orden'))
        const data = await fetchCollectionData(q);
    
        return data;
        
    } catch (error) {
        console.log(error)
        return [];
    }
}

/* #region eventos */

export async function fetchEventos(userId) {
    if (!userId) return

    try {
        const collectionRef = collection(db, `usuarios/${userId}/eventos`)
        const collectionData = await fetchCollectionDataWithId(collectionRef)

        return collectionData;

    } catch (error) {
        console.log(error)
    }
}

export async function updateEventos(userId, eventos, fecha) {
    if (!userId || !eventos || !fecha) return

    try {
        const collectionRef = collection(db, `usuarios/${userId}/eventos`)
        const queryEventosFecha = query(collectionRef, where('date', '==', fecha))
        const collectionData = await fetchCollectionDataWithId(queryEventosFecha)

        const batch = writeBatch(db);

        /* Limpiar los eventos de esa fecha */
        if (collectionData && collection.length > 0) {
            collectionData.forEach((item) => {
                const docRef = doc(collectionRef, item.id)
                batch.delete(docRef)
            })
        }

        /* Guardar o actualizar los eventos */
        if (eventos.length > 0) {
            eventos.forEach((item) => {
                const docRef = doc(collectionRef)
                batch.set(docRef, {
                    rutinaId: item.rutinaId,
                    date: item.date,
                    title: item.title
                })
            })
        }

        /* Hacer commit del batch */
        await batch.commit()

        const result = await fetchCollectionDataWithId(queryEventosFecha)
        return result;


    } catch (error) {
        console.log(error)
    }
}

export async function updateEvento(userId, evento, newDate) {
    if (!userId || !evento || !newDate) return

    try {
        const collectionRef = collection(db, `usuarios/${userId}/eventos`)
        /* Eliminar eventos duplicados en la misma fecha */
        const queryDuplicados = query(collectionRef, where('rutinaId', '==', evento.rutinaId), where('date', '==', newDate))
        const duplicados = await fetchCollectionDataWithId(queryDuplicados)

        const batch = writeBatch(db)

        if (duplicados && duplicados.length) {
            duplicados.forEach((item) => {
                const docRef = doc(collectionRef, item.id)
                batch.delete(docRef)
            })
        }

        const docRef = doc(collectionRef, evento.id)
        batch.update(docRef, {
            date: newDate
        })

        await batch.commit()
        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

export async function destroyEvento(userId, eventoId) {
    if (!userId || !eventoId) return

    try {
        const docRef = doc(db, `usuarios/${userId}/eventos/${eventoId}`)
        await deleteDoc(docRef)

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

/* #region categorias */
export async function storeCategoria(idUser, data) {
    const collectionRef = collection(db, `usuarios/${idUser}/categorias`)

    try {
        const docRef = await addDoc(collectionRef, {
            ...data
        })

        const result = await getDoc(docRef)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}

export async function updateCategoria(path, data) {
    try {
        const categoria = doc(db, path)

        await updateDoc(categoria, {
            ...data,
        })
        
        const result = await getDoc(categoria)
        return result;

    } catch (err) {
        console.log(err)
        return null
    }
}