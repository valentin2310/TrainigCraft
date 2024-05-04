'use client'

import { fetchEjercicios } from "@/app/lib/data"
import { useEjercicios } from "@/app/stores/use-ejercicios"
import { Button, useDisclosure } from "@nextui-org/react"
import { use, useEffect, useState } from "react"
import GridEjercicios from "@/app/ui/ejercicios/grid-ejercicios"
import EjercicioModalForm from "@/app/ui/ejercicios/modal-form"
import { UserContext } from "@/app/providers"
import { useMusculos } from "@/app/stores/use-musculos"
import FiltroEjercicios from "@/app/ui/ejercicios/ejercicios-filtro"

export default function Page() {
    const { ejercicios, setEjercicios, filteredEjercicios, setFilteredEjercicios } = useEjercicios()
    const { musculos, getDefault } = useMusculos()

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const [img, setImg] = useState(null)

    const user = use(UserContext)

    const fetchData = async () => {
        const _ejercicios = await fetchEjercicios(user.id);
        setEjercicios(_ejercicios)
        setFilteredEjercicios(_ejercicios)

        getDefault()
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="w-full flex flex-col mb-5">
                <h1 className="text-2xl text-primary font-semibold">Mis ejercicios</h1>
            </div>

            <div className="mb-5 bg-gray-50 grid grid-cols-11 items-end gap-3 p-4 rounded shadow">
                <Button className="col-span-1 h-full" 
                    color="primary" variant="flat" onPress={onOpen}
                    startContent={<i className="ri-file-add-line text-lg"></i>}
                >
                    <span className="hidden sm:inline">Añadir</span>
                </Button>
                <FiltroEjercicios 
                    ejercicios={ejercicios}
                    musculos={musculos}
                    setFilteredEjercicios={setFilteredEjercicios}
                />
            </div>

            {ejercicios?.length > 0 &&
                <GridEjercicios lista={filteredEjercicios} />
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