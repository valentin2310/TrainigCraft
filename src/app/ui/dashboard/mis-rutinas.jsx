'use client'

import { fetchRutinas } from "@/app/lib/data"
import RutinaCard from "@/app/ui/rutinas/rutina-card"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/providers";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Link } from "@nextui-org/react";
import { useRutinas } from "@/app/stores/use-rutinas";
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';
import { useRouter } from "next/navigation";

export default function MisRutinas() {
    const router = useRouter()
    const user = useContext(UserContext)
    const { rutinas, setRutinas } = useRutinas()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const fetchData = async () => {
        const _rutinas = await fetchRutinas(user.id, 5)
        setRutinas(_rutinas)
    }

    const seeAll = () => {
        router.push('/dashboard/rutinas')
    }

    const createNew = () => {
        router.push('/dashboard/rutinas/create')
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="w-full flex justify-between items-center mb-2">
                <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-list-check-2 text-lg lg:text-xl me-2"></i>Mis rutinas</p>
                <div className="flex gap-1 sm:gap-2">
                    <Link href="/dashboard/rutinas/create">
                        <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-file-add-line"></i>} />
                        <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-file-add-line text-xl"></i>}>
                            <span>Añadir</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard/rutinas">
                        <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-eye-line"></i>} />
                        <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-eye-line text-xl"></i>}>
                            <span>Ver todas</span>
                        </Button>
                    </Link>

                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-3">
                {rutinas && rutinas.map((rutina) => {
                    return (
                        <RutinaCard key={rutina.id} rutina={rutina} />
                    )
                })}
                {(rutinas && rutinas.length > 0) &&
                    <Link href="/dashboard/rutinas" className="p-4 w-full h-full flex flex-col cursor-pointer bg-secondary text-gray-300 rounded-xl shadow text-center hover:bg-dark duration-500">
                        <p className="text-xl mb-4">Ver todas las rutinas</p>
                        <i className="ri-eye-line text-5xl text-primary"></i>
                    </Link>
                    ||
                    <Link href="/dashboard/rutinas/create" className="p-4 w-full h-full flex flex-col cursor-pointer bg-secondary text-gray-300 rounded-xl shadow text-center hover:bg-dark duration-500">
                        <p className="text-xl mb-4">Crear nueva rutina</p>
                        <i className="ri-file-add-line text-5xl text-primary"></i>
                    </Link>
                }
            </div>

            {/*  <div className="grid grid-cols-3 gap-3">
                
            </div> */}


        </>
    )
}