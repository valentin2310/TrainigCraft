'use client'

import { Uppload, es, Local, Crop } from "uppload";
import "uppload/dist/uppload.css"
import "uppload/dist/themes/light.css"
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { subirImg } from "@/app/lib/data-storage";

const defaultImage = "https://via.placeholder.com/150x150"

export default function UpploadReact({ userId }) {
    const uploader = new Uppload({
        lang: es,
        maxSize: [500, 500],
        compression: 0.8,
        compressionToMime: "image/webp",
        uploader: (file, updateProgress) =>
            new Promise(resolve => {
                resolve(window.URL.createObjectURL(file))
                let progress = 0;

                const interval = setInterval(() => {
                    if (progress > 99) clearInterval(interval);
                    updateProgress(progress++);
                }, 30);
            })
    })

    // Services
    uploader.use([new Local()]);

    // Effects
    uploader.use(new Crop({ aspectRatio: 1 }));

    const [url, setUrl] = useState(defaultImage)
    const [ready, setReady] = useState(false)

    const urlToBlob = async (url) => {
        const response = await fetch(url)
        const blob = await response.blob()
        return blob;
    }

    const handleClick = () => {
        uploader.on("upload", async (url) => {
            /* setUrl(url) */
            console.log(url)
            
            const blob = await urlToBlob(url)
            const uploadedUrl = await subirImg(userId, blob)

            setUrl(uploadedUrl);
            console.log(uploadedUrl)

        })

        uploader.open()
    }

    return (
        <>
            <div className="max-w-fit flex flex-col items-center gap-1">
                <img alt="" width={150} height={150} src={url} className="rounded-lg" />
                <Button variant="ghost" color="primary" onClick={handleClick}>Seleccionar imagen.</Button>
            </div>
        </>
    )
}