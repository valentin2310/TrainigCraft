import { storage } from "@/firebase/client-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function subirImg(userId, img) {  
    const ejerciciosRef = ref(storage, `imagenes/${userId}/ejercicios`)
    const imgRef = ref(ejerciciosRef, uuidv4())

    const imgSnapshot = await uploadBytes(imgRef, img)
    console.log(imgSnapshot.metadata)

    const url = await getDownloadURL(imgRef)
    console.log(url)

    return url
}