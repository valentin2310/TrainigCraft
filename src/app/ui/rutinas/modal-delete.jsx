import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { deleteRutina } from '@/app/lib/rutina-actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRutinas } from '@/app/stores/use-rutinas'

const initialState = {
    message: ''
}

export default function RutinaModalDelete({ isOpen, onClose, onOpenChange, rutina }) {
    const deleteRutinaWithParams = deleteRutina.bind(null, rutina?.path)
    const [ state, formAction ] = useFormState(deleteRutinaWithParams, initialState)
    const { destroyRutina } = useRutinas()

    useEffect(() => {
        // Si se ha podido eliminar el estado será success = true
        if (!state?.success) {
            return
        }

        // Eliminar de la lista
        destroyRutina(rutina)
        onClose()

    }, [state])

    return (
        <>
            <Modal className="z-50" size="md" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>¿Estas seguro que quieres eliminar esta rutina?</p>
                            </ModalHeader>
                            <form action={formAction}>
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <p aria-live="polite" className="sr-only">
                                        {state?.message}
                                        {state?.errors?.user}
                                    </p>
                                    <p>La rutina <span className="font-bold">'{rutina.titulo}'</span> se eliminará permanentemente.</p>
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