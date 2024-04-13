import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { deleteEjercicio } from '@/app/lib/ejercicio-actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useEjercicios } from '@/app/stores/use-ejercicios'

const initialState = {
    message: ''
}

export default function EjercicioModalDelete({ isOpen, onClose, onOpenChange, ejercicio }) {
    const deleteEjercicioWithPath = deleteEjercicio.bind(null, ejercicio?.path)
    const [state, formAction] = useFormState(deleteEjercicioWithPath, initialState)
    const { destroyEjercicio } = useEjercicios()

    useEffect(() => {
        // Si se ha podido eliminar el estado será success = true
        if (!state?.success) {
            return
        }

        // Eliminar ejercicio
        destroyEjercicio(ejercicio)

        onClose()

    }, [state])

    return (
        <>
            <Modal className="z-50" size="md" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>¿Estas seguro que quieres eliminar este ejercicio?</p>
                            </ModalHeader>
                            <form action={formAction}>
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <p aria-live="polite" className="sr-only">
                                        {state?.message}
                                        {state?.errors?.user}
                                    </p>
                                    <p>El ejercicio <span className="font-bold">'{ejercicio.nombre}'</span> se eliminará permanentemente.</p>
                                    <i className="ri-close-circle-fill text-red-500 text-[100px] text-center"></i>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant="light" onPress={onClose}>Cancelar</Button>
                                    <Button type="submit" color="danger">Eliminar</Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}