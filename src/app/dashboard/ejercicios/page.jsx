'use client'

import { fetchEjercicios } from "@/app/lib/data"
import { useEjercicios } from "@/app/stores/use-ejercicios"
import { Button, useDisclosure } from "@nextui-org/react"
import { use, useEffect, useState } from "react"
import GridEjercicios from "@/app/ui/ejercicios/grid-ejercicios"
import EjercicioModalForm from "@/app/ui/ejercicios/modal-form"
import { UserContext } from "@/app/providers"
import { subirImg } from "@/app/lib/data-storage"
import UpploadReact from "@/uppload/uploader"

export default function Page() {
    const { ejercicios, setEjercicios } = useEjercicios()
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const [img, setImg] = useState(null)

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        /* const uploadedUrl = await subirImg(user.id, file)
        setImg(uploadedUrl); */
      };

    const user = use(UserContext)

    const fetchData = async () => {
        const _ejercicios = await fetchEjercicios(user.id);
        setEjercicios(_ejercicios)
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="w-full flex justify-between items-center mb-10">
                <p className="text-xl text-primary font-semibold mb-3">Mis ejercicios</p>
                <div className="flex gap-2">
                    <Button onPress={onOpen}>
                        <i className="ri-file-add-line m-2"></i><span className="hidden sm:inline">Añadir</span>
                    </Button>
                </div>
            </div>

            {/* <input type="file" onChange={handleFileChange} />
            {img && <img src={img} alt="Preview" />} */}

            {user && <UpploadReact userId={user.id} />}

            {ejercicios?.length > 0 &&
                <GridEjercicios lista={ejercicios} />
                || <div className="flex flex-col">
                    <span>No tienes ningún ejercicio creado aún :(</span>
                    <span>Prueba a crear un nuevo ejercicio.</span>
                </div>

            }

            {user &&
                <EjercicioModalForm
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    idUser={user.id}
                />
            }
        </>
    )
}