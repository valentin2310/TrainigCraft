'use client'

import { fetchEjercicios } from "@/app/lib/data"
import { useEjercicios } from "@/app/stores/use-ejercicios"
import { Button, useDisclosure } from "@nextui-org/react"
import { use, useEffect, useState } from "react"
import EjercicioModalForm from "@/app/ui/ejercicios/modal-form"
import { UserContext } from "@/app/providers"
import { useMusculos } from "@/app/stores/use-musculos"
import FiltroEjercicios from "@/app/ui/ejercicios/ejercicios-filtro"
import EjercicioCard from "@/app/ui/ejercicios/ejercicio-card"

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

            <div className="mb-5 bg-gray-50 grid grid-cols-10 items-end gap-3 p-4 rounded shadow">
                <FiltroEjercicios
                    ejercicios={ejercicios}
                    musculos={musculos}
                    setFilteredEjercicios={setFilteredEjercicios}
                />
            </div>

            <div className="grid md:grid-cols-3 2xl:grid-cols-5 gap-3">
                <div onClick={onOpen} className="p-4 cursor-pointer bg-secondary text-gray-300 rounded-xl shadow text-center border-2 border-gray-100 hover:bg-dark duration-500">
                    <p className="text-xl mb-4">Crear nuevo ejercicio</p>
                    <i className="ri-file-add-line text-5xl text-primary"></i>
                </div>
                {filteredEjercicios?.length > 0 && filteredEjercicios.map((ej) => (
                    <EjercicioCard key={ej.id} ejercicio={ej} />
                ))}
            </div>

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