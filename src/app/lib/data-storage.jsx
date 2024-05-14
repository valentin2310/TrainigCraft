import { storage } from "@/firebase/client-config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function subirImg(img) {  
    const ejerciciosRef = ref(storage, `imagenes/ejercicios`)
    const imgRef = ref(ejerciciosRef, uuidv4())

    const imgSnapshot = await uploadBytes(imgRef, img)
    console.log(imgSnapshot.metadata)

    const url = await getDownloadURL(imgRef)
    console.log(url)

    return url
}

export async function destroyImg(path) {
    const imgRef = ref(storage, path)
    const result = await deleteObject(imgRef)
    console.log(result)
    return result
}