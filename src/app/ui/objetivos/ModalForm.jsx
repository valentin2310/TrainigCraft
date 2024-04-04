'use client'

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, RadioGroup, Radio, cn } from "@nextui-org/react"
import { Rate } from "rsuite";
import { renderRateCharacter } from "@/app/lib/utils";
import { addUserObjetivo } from "@/app/lib/actions";
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from "react";

export const CustomRadio = (props) => {
    const {children, ...otherProps} = props;
  
    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "inline-flex m-0 hover:bg-content2 items-center justify-between",
            "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 ps-0 border-2 border-transparent",
            "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5"
          ),
        }}
      >
        {children}
      </Radio>
    );
};

const initialState = {
    message: ''
}

export function ObjetivoModalForm({ userId, isOpen, onClose, onOpenChange, actualizarObjetivos, nObjetivos }) {
    const addUserObjetivoWithId = addUserObjetivo.bind(null, userId)
    const [state, formAction] = useFormState(addUserObjetivoWithId, initialState)
    const { pending } = useFormStatus()
    const [dificultad, setDificultad] = useState(1)

    useEffect(() => {  
        // Si se ha podido guardar el item el state será null o undefined
        if (!state) {
            actualizarObjetivos(userId, nObjetivos)
            onClose()
        }
    }, [state])

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="bg-secondary">
                            <i className="ri-focus-2-line text-white text-xl me-2"></i>
                            <p className="font-bold text-white">Crear nuevo objetivo</p>
                        </ModalHeader>
                        <form action={formAction}>
                            <ModalBody className="max-h-[500px] overflow-y-auto">
                                <p className="bg-primary/20 py-2 px-4 mt-2 rounded-xl">Marcate un nuevo objetivo, define cuales son tus metas a cumplir.</p>
                                <p aria-live="polite" className="sr-only">
                                    {state?.messages}
                                    {state?.errors?.user}
                                </p>
                                <div className="my-5 flex flex-col gap-5">
                                    <Input
                                        name="titulo"
                                        type="text"
                                        label="Titulo *"
                                        labelPlacement="outside"
                                        placeholder="Quiero lograr.."
                                        required
                                        isInvalid={!!state?.errors?.titulo}
                                        errorMessage={state?.errors?.titulo}
                                    />
                                    <Textarea 
                                        name="descripcion"
                                        label="Descripción"
                                        labelPlacement="outside"
                                        placeholder="El objetivo trata de.."
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
                                                defaultValue={1} 
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
                                    <div className="">
                                        <p className="text-small mb-2">Importancia *</p>
                                        <RadioGroup 
                                            required 
                                            name="importancia" 
                                            description="Que tan importante es conseguir este objetivo?"
                                            isInvalid={!!state?.errors?.importancia}
                                            errorMessage={state?.errors?.importancia}
                                        >
                                            <CustomRadio value={1}>
                                                <div className="flex gap-3">
                                                    <i className="ri-medal-line text-amber-700 text-5xl"></i>
                                                    <div className="">
                                                        <p>Poco importante</p>
                                                        <p className="text-small text-gray-400">Es poco importante, es más secundario. (importancia 1)</p>
                                                    </div>
                                                </div>
                                            </CustomRadio>
                                            <CustomRadio value={2}>
                                                <div className="flex gap-3">
                                                    <i className="ri-medal-line text-slate-400 text-5xl"></i>
                                                    <div className="">
                                                        <p>Importante</p>
                                                        <p className="text-small text-gray-400">Lo considero importante, me gustaría conseguirlo. (importancia 2)</p>
                                                    </div>
                                                </div>
                                            </CustomRadio>
                                            <CustomRadio value={3}>
                                                <div className="flex gap-3">
                                                    <i className="ri-medal-line text-yellow-500 text-5xl"></i>
                                                    <div className="">
                                                        <p>Muy importante</p>
                                                        <p className="text-small text-gray-400">Es muy importante, quiero conseguirlo si o si. (importancia 3)</p>
                                                    </div>
                                                </div>
                                            </CustomRadio>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button isLoading={pending} color="danger" variant="light" onPress={onClose}>Cancelar</Button>
                                <Button type="submit" color="primary">Guardar</Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}