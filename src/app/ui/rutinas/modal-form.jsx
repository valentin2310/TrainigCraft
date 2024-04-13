import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem, Chip } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'
import { useEjercicios } from "@/app/stores/use-ejercicios";
import { addRutina, editRutina } from "@/app/lib/rutina-actions";
import { useRutinas } from "@/app/stores/use-rutinas";
import { usecategorias } from "@/app/stores/use-categorias";

const initialState = {
    message: ''
}

export default function RutinaModalForm({ isOpen, onClose, onOpenChange, idUser = null, rutina = null }) {
    const { storeRutina, updateRutina } = useRutinas()
    const { categorias } = usecategorias()

    const addRutinaWithParams = addRutina.bind(null, idUser)
    const editRutinaWithParams = editRutina.bind(null, rutina?.path)

    const [state, formAction] = useFormState(rutina ? editRutinaWithParams : addRutinaWithParams, initialState)

    const { pending } = useFormStatus()

    useEffect(() => {
        // Si se ha podido guardar el item el state será null o undefined
        // También puede tener success = true
        if (state && !state?.success) {
            return
        }

        if (!rutina) {
            // Guardar item en la lista lista
            storeRutina(state.data)

        } else {
            // Actualizar lista
            updateRutina(state.data)
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
                                <p className="font-bold text-white">{rutina ? 'Editar' : 'Crear nueva'} rutina</p>
                            </ModalHeader>
                            <form action={formAction}>

                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <div className="my-5 flex flex-col gap-5">
                                        <input type="hidden" name="ejercicios[]" value={null} />
                                        <Input
                                            name="titulo"
                                            type="text"
                                            label="Titulo *"
                                            labelPlacement="outside"
                                            placeholder="Rutina de.."
                                            required
                                            defaultValue={rutina?.titulo}
                                            isInvalid={!!state?.errors?.titulo}
                                            errorMessage={state?.errors?.titulo}
                                        />
                                        <Textarea
                                            name="descripcion"
                                            label="Descripción"
                                            labelPlacement="outside"
                                            placeholder="La rutina trata de.."
                                            defaultValue={rutina?.descripcion}
                                            isInvalid={!!state?.errors?.descripcion}
                                            errorMessage={state?.errors?.descripcion}
                                        />
                                        <Select
                                            name="categorias[]"
                                            items={categorias}
                                            label="Categorías"
                                            isMultiline={true}
                                            selectionMode="multiple"
                                            placeholder="Pertenece a la categoría/as.."
                                            labelPlacement="outside"
                                            classNames={{
                                                trigger: "py-2"
                                            }}
                                            selectedKeys={rutina?.categorias.map((cat) => (cat.id))}
                                            isInvalid={!!state?.errors?.categorias}
                                            errorMessage={state?.errors?.categorias}
                                            renderValue={(items) => (
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <Chip key={item.key} color="default" variant="bordered" startContent={<i className="ri-circle-fill" style={{color: item.data.color}}></i>}>
                                                            {item.data.nombre}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {(categoria) => (
                                                <SelectItem key={categoria.id} value={categoria.id} textValue={categoria.nombre}>
                                                    <span style={{color: categoria.color}}>{categoria.nombre}</span>
                                                </SelectItem>
                                            )}
                                        </Select>
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