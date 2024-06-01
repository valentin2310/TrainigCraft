'use client'

import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Chip, useDisclosure } from '@nextui-org/react'
import { use, useEffect, useState } from 'react'
import FiltroEjercicios from './ejercicios-filtro'
import EjercicioCardSimple from './ejercicio-card-simple'
import EjercicioModalForm from './modal-form'
import { UserContext } from '@/app/providers'

export default function ModalPickEjercicio({ isOpen, onClose, onOpenChange, ejercicios, musculos, filteredEjercicios, setFilteredEjercicios, selectedEjercicio = null, setSelectedEjercicio }) {
    const user = use(UserContext)
    
    const [selected, setSelected] = useState(undefined)
    const { isOpen : isOpenCreateEjercicio, onOpen : onOpenCreateEjercicio, onClose : onCloseCreateEjercicio, onOpenChange : onOpenChangeCreateEjercicio } = useDisclosure()

    const addSelected = (value) => {
        if (isSelected(value.id)) {
            removeSelected(value.id)
            return;
        }

        setSelected(value)
    }

    const removeSelected = (id) => {
        setSelected(undefined)
    }

    const isSelected = (id) => {
        return selected && selected.id == id
    }

    const handleSubmit = () => {
        setSelectedEjercicio(selected)
        onClose()
    }

    useEffect(() => {
        if (isOpen == false) return

        setFilteredEjercicios(ejercicios)

        if (selectedEjercicio) {
            setSelected(selectedEjercicio)
        }

        return
    }, [isOpen])

    return (
        <>
            <Modal className="z-50" size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>Selecciona un ejercicio.</p>
                            </ModalHeader>
                            <form >
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <div className="mb-3 grid grid-cols-10 gap-3 py-2">
                                        <FiltroEjercicios
                                            ejercicios={ejercicios}
                                            musculos={musculos}
                                            setFilteredEjercicios={setFilteredEjercicios}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        <div onClick={onOpenCreateEjercicio} className="p-4 grid place-items-center cursor-pointer bg-secondary text-gray-300 rounded-xl shadow text-center border-2 border-gray-100 hover:bg-dark duration-500">
                                            <div className="">
                                                <p className="text-xl mb-4">Crear nuevo ejercicio</p>
                                                <i className="ri-file-add-line text-5xl text-primary"></i>
                                            </div>
                                        </div>
                                        {filteredEjercicios && filteredEjercicios.map((item) => (
                                            <div key={item.id} className="" onClick={() => addSelected(item)}>
                                                <EjercicioCardSimple
                                                    ejercicio={item}
                                                    selected={isSelected(item.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>Cancelar</Button>
                                    <Button onClick={handleSubmit} color="primary">Guardar</Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {user && 
                <EjercicioModalForm
                    isOpen={isOpenCreateEjercicio}
                    onClose={onCloseCreateEjercicio}
                    onOpenChange={onOpenChangeCreateEjercicio}
                    idUser={user.id}
                />
            }
        </>
    )
}