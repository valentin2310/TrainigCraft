import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem, Chip } from "@nextui-org/react"
import { Rate } from "rsuite";
import { renderRateCharacter } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { addEjercicio, editEjercicio } from "@/app/lib/ejercicio-actions";
import { useFormState, useFormStatus } from 'react-dom'
import { useEjercicios } from "@/app/stores/use-ejercicios";
import { useMusculos } from "@/app/stores/use-musculos";
import UpploadReact from "@/uppload/uploader";

const initialState = {
    message: ''
}

export default function EjercicioModalForm({ isOpen, onClose, onOpenChange, ejercicio = null, idUser = null }) {
    const { storeEjercicio, updateEjercicio } = useEjercicios()
    const { musculos, getDefault: getDefaultMusculos } = useMusculos()

    const addEjercicioWithParams = addEjercicio.bind(null, idUser)
    const editEjercicioWithPath = editEjercicio.bind(null, ejercicio?.path)

    const [state, formAction] = useFormState(ejercicio ? editEjercicioWithPath : addEjercicioWithParams, initialState)

    const { pending } = useFormStatus()
    const [dificultad, setDificultad] = useState(ejercicio ? ejercicio.dificultad : 1)
    const [imgUrl, setImgUrl] = useState(null)

    useEffect(() => {
        getDefaultMusculos()
    }, [])

    useEffect(() => {
        // Si se ha podido guardar el item el state será null o undefined
        // También puede tener success = true
        if (state && !state?.success) {
            return
        }

        if (!ejercicio) {
            // Guardar item en la lista lista
            storeEjercicio(state.data)

        } else {
            // Actualizar lista
            updateEjercicio(state.data)
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
                                <p className="font-bold text-white">{ejercicio ? 'Editar' : 'Crear nuevo'} ejercicio</p>
                            </ModalHeader>
                            <form action={formAction}>

                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <div className="my-5 flex flex-col gap-5">
                                        <Input
                                            name="nombre"
                                            type="text"
                                            label="Nombre *"
                                            labelPlacement="outside"
                                            placeholder="Flexiones.."
                                            required
                                            defaultValue={ejercicio?.nombre}
                                            isInvalid={!!state?.errors?.nombre}
                                            errorMessage={state?.errors?.nombre}
                                        />
                                        <div className="">
                                            <p className="text-sm">Imagen</p>
                                            <div className="w-full grid place-items-center bg-gray-100 py-2 rounded-xl">
                                                <UpploadReact userId={idUser} imgUrl={ejercicio?.imgPath ?? null} setImgUrl={setImgUrl} />
                                                <input type="hidden" name="imgUrl" value={imgUrl} />
                                            </div>
                                        </div>
                                        <Textarea
                                            name="descripcion"
                                            label="Descripción"
                                            labelPlacement="outside"
                                            placeholder="El ejercicio trata de.."
                                            defaultValue={ejercicio?.descripcion}
                                            isInvalid={!!state?.errors?.descripcion}
                                            errorMessage={state?.errors?.descripcion}
                                        />
                                        <div className="">
                                            <p className="text-small">Dificultad *</p>
                                            <div className="px-2">
                                                <Rate
                                                    required
                                                    onChange={(value) => { setDificultad(value) }}
                                                    value={dificultad}
                                                    defaultValue={ejercicio?.dificultad}
                                                    renderCharacter={renderRateCharacter}
                                                    aria-describedby="dificultad-error"
                                                />
                                                <div id="dificultad-error" aria-live="polite" aria-atomic="true">
                                                    {state?.errors?.dificultad &&
                                                        state?.errors.dificultad.map((error) => (
                                                            <p className="mt-4 text-tiny text-red-500" key={error}>
                                                                {error}
                                                            </p>
                                                        ))}
                                                </div>
                                                <input type="hidden" name="dificultad" value={dificultad} />
                                            </div>
                                        </div>
                                        <Select
                                            name="musculos[]"
                                            items={musculos}
                                            label="¿Que músuclos trabaja?"
                                            isMultiline={true}
                                            selectionMode="multiple"
                                            placeholder="Selecciona los músculos que trabajas con este ejercicio.."
                                            labelPlacement="outside"
                                            classNames={{
                                                trigger: "py-2"
                                            }}
                                            defaultSelectedKeys={ejercicio?.musculos}
                                            isInvalid={!!state?.errors?.musculos}
                                            errorMessage={state?.errors?.musculos}
                                            renderValue={(items) => (
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <Chip key={item.key} color="primary" variant="dot">
                                                            {item.data.nombre}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {(muscle) => (
                                                <SelectItem key={muscle.nombre} value={muscle.nombre} textValue={muscle.nombre}>
                                                    {muscle.nombre}
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