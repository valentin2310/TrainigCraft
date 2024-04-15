'use client'

import { Button, useDisclosure } from "@nextui-org/react"
import RutinaCard from "@/app/ui/rutinas/rutina-card";
import { use, useEffect } from "react";
import { UserContext } from "@/app/providers";
import { useRutinas } from "@/app/stores/use-rutinas";
import { fetchCategorias, fetchRutinas } from "@/app/lib/data";
import RutinaModalForm from "@/app/ui/rutinas/modal-form";
import { usecategorias } from "@/app/stores/use-categorias";

export default function Page() {
    const user = use(UserContext)
    const { rutinas, setRutinas } = useRutinas()
    const { setCategorias } = usecategorias()
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const fetchData = async () => {
        const _rutinas = await fetchRutinas(user.id);
        setRutinas(_rutinas)
        
        const _categorias = await fetchCategorias(user.id);
        setCategorias(_categorias)
    }

    useEffect(() => {
        if (!user) return
        
        fetchData()

    }, [user])

    return (
        <>
            <div className="mb-10 max-w-[800px]">
                <h1 className="text-2xl text-primary font-semibold mb-3">Mis rutinas</h1>
                <p>Aquí puedes ver y buscar todas tus rutinas, en caso de no tener ninguna rutina, puedes crear ilimitadas rutinas, como tu quieras, totalmente personalizada, también los ejercicios ;)</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                <div onClick={onOpen} className="p-4 cursor-pointer bg-secondary text-gray-300 rounded shadow text-center hover:bg-dark duration-500">
                    <p className="text-xl mb-4">Crear nueva rutina</p>
                    <i className="ri-file-add-line text-5xl text-white"></i>
                </div>
                {rutinas && rutinas.map((r) => (
                    <RutinaCard
                        key={r.id}
                        rutina={r}
                    />
                ))}
            </div>

            {/* Modal crear rutinas */}
            <RutinaModalForm 
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                idUser={user?.id}
            />
        </>
    )
}