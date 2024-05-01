import { storage } from "@/firebase/client-config"
import { v4 as uuidv4 } from "uuid";

const uploader = (file, updateProgress) =>
    new Promise((resolve, reject) => {
        const ejerciciosRef = ref(storage, `imagenes/${userId}/ejercicios`)
        const imgRef = ref(ejerciciosRef, uuidv4())
        const uploadTask = imgRef.put(file)

        uploadTask.on("state_changed",
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (updateProgress) updateProgress(progress)
            },
            error => {
                console.log("Got error", error);
                return reject(new Error("unable_to_upload"));
            },
            () => {
                console.log("Uploaded!");
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(url => resolve(url))
                    .catch(() => reject(new Error("unable_to_upload")));
            }
        )
    })
 
export default uploader;