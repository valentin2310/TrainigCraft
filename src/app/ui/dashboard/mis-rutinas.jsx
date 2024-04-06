'use client'

import { fetchRutinas } from "@/app/lib/data"
import RutinaCard from "@/app/ui/rutina-card"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/providers";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";

export default function MisRutinas() {
    const user = useContext(UserContext)
    const [rutinas, setRutinas] = useState([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    useEffect(() => {
        if (!user) return
        setRutinas(fetchRutinas(user.id))
        
    }, [user])

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <p className="text-xl text-primary font-semibold">Mis rutinas</p>
                <div className="flex gap-2">
                    <Button onPress={onOpen}>
                        <i className="ri-file-add-line m-2"></i><span className="hidden sm:inline">Añadir</span>
                    </Button>
                    <Button>
                        <i className="ri-eye-line m-2"></i><span className="hidden sm:inline">Ver todas</span>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
                <div onClick={onOpen} className="p-4 cursor-pointer bg-secondary text-gray-300 rounded shadow text-center hover:bg-dark duration-500">
                    <p className="text-xl mb-4">Crear nueva rutina</p>
                    <i className="ri-file-add-line text-5xl text-white"></i>
                </div>
                {rutinas && rutinas.map((rutina) => {
                    return (
                        <RutinaCard key={rutina.id} rutina={rutina} />
                    )
                })}
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Modal title</ModalHeader>
                            <ModalBody>
                                <p>Hola mundo!!</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                                <Button color="primary" onPress={onClose}>Action</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}