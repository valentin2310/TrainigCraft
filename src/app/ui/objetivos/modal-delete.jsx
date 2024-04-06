import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { deleteObjetivo } from '@/app/lib/objetivo-actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useObjetivos } from '@/app/stores/use-objetivos'

const initialState = {
    message: ''
}

export default function ObjetivoModalDelete({ isOpen, onClose, onOpenChange, objetivo }) {
    const deleteObjetivoWithPath = deleteObjetivo.bind(null, objetivo?.path)
    const [state, formAction] = useFormState(deleteObjetivoWithPath, initialState)
    const { destroyObjetivo } = useObjetivos()

    useEffect(() => {
        // Si se ha podido eliminar el estado será success = true
        if (!state?.success) {
            return
        }

        // Eliminar objetivo
        destroyObjetivo(objetivo)
        onClose()

    }, [state])

    return (
        <>
            <Modal className="z-50" size="md" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>¿Estas seguro que quieres eliminar este objetivo?</p>
                            </ModalHeader>
                            <form action={formAction}>
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <p aria-live="polite" className="sr-only">
                                        {state?.message}
                                        {state?.errors?.user}
                                    </p>
                                    <p>El objetivo <span className="font-bold">'{objetivo.titulo}'</span> se eliminará permanentemente.</p>
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