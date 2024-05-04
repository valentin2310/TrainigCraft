import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Chip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import FiltroEjercicios from './ejercicios-filtro'
import EjercicioCardSimple from './ejercicio-card-simple'

export default function ModalPickEjercicio({ isOpen, onClose, onOpenChange, ejercicios, musculos, filteredEjercicios, setFilteredEjercicios, selectedEjercicio = null, setSelectedEjercicio }) {
    const [selected, setSelected] = useState(undefined)

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

                                    <div className="grid grid-cols-2 gap-2">
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
        </>
    )
}