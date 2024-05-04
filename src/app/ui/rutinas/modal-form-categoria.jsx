import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem, Chip } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'
import { usecategorias } from "@/app/stores/use-categorias";
import { addCategoria, editCategoria } from "@/app/lib/categoria-actions";
import { HuePicker, TwitterPicker } from "react-color";

const initialState = {
    message: ''
}

export default function CategoriaModalForm({ isOpen, onClose, onOpenChange, idUser = null, categoria = null }) {
    const { storeCategoria, updateCategoria } = usecategorias()

    const addCategoriaWithParams = addCategoria.bind(null, { idUser: idUser })
    const editCategoriaWithParams = editCategoria.bind(null, { path: categoria?.path })

    const [state, formAction] = useFormState(categoria ? editCategoriaWithParams : addCategoriaWithParams, initialState)
    const { pending } = useFormStatus()

    const [color, setColor] = useState(categoria?.color || "#fff")

    useEffect(() => {
        // Si se ha podido guardar el item el state será null o undefined
        // También puede tener success = true
        console.log(state)
        if (state && !state?.success) {
            return
        }

        if (!categoria) {
            // Guardar item en la lista lista
            storeCategoria(state.data)

        } else {
            // Actualizar lista
            updateCategoria(state.data)
        }
        onClose()

    }, [state])

    return (
        <>
            <Modal className="z-50" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="bg-secondary">
                                <i className="ri-add-circle-line text-white text-xl me-2"></i>
                                <p className="font-bold text-white">{categoria ? 'Editar' : 'Crear nueva'} categoria</p>
                            </ModalHeader>
                            <form action={formAction}>
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <div className="my-5 flex flex-col gap-5">
                                        <Input
                                            name="nombre"
                                            type="text"
                                            label="Nombre *"
                                            labelPlacement="outside"
                                            placeholder="Ej: gimnasio, calistenia.."
                                            required
                                            defaultValue={categoria?.nombre}
                                            isInvalid={!!state?.errors?.nombre}
                                            errorMessage={state?.errors?.nombre}
                                        />
                                        <Input
                                            name="color"
                                            type="text"
                                            label="Color"
                                            labelPlacement="outside"
                                            placeholder="Ej: #fff"
                                            value={color}
                                            readOnly
                                            onChange={(e) => setColor(e.target.value)}
                                            isInvalid={!!state?.errors?.color}
                                            errorMessage={state?.errors?.color}
                                            startContent={<div className="p-3 rounded" style={{backgroundColor: color}}></div>}
                                        />
                                        <div className="flex flex-col gap-3 px-2">
                                            <HuePicker 
                                                color={color}
                                                onChangeComplete={(e) => setColor(e.hex)}
                                            />
                                            <TwitterPicker
                                                color={color}
                                                onChangeComplete={(e) => setColor(e.hex)}
                                            />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>Cancelar</Button>
                                    <Button isLoading={pending} type="submit" color="primary">Guardar</Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}