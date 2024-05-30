import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, RadioGroup, Radio, cn, Switch } from "@nextui-org/react"
import { Rate } from "rsuite";
import { renderRateCharacter } from "@/app/lib/utils";
import { addObjetivo, editObjetivo } from "@/app/lib/objetivo-actions";
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from "react";
import { useObjetivos } from "@/app/stores/use-objetivos";

export const CustomRadio = (props) => {
    const { children, ...otherProps } = props;

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

export default function ObjetivoModalForm({ userId = null, isOpen, onClose, onOpenChange, objetivo = null }) {
    const { storeObjetivo, updateObjetivo } = useObjetivos()

    const addObjetivoWithId = addObjetivo.bind(null, userId)
    const editObjetivoWithPath = editObjetivo.bind(null, objetivo?.path)

    const [state, formAction] = useFormState(objetivo ? editObjetivoWithPath : addObjetivoWithId, initialState)

    const { pending } = useFormStatus()
    const [dificultad, setDificultad] = useState(objetivo ? objetivo.dificultad : 1)

    useEffect(() => {
        // Si se ha podido guardar el item el state será null o undefined
        // También puede tener success = true
        if (state && !state?.success) {
            return
        }

        if (!objetivo) {
            // Guardar objetivo
            storeObjetivo(state.data)

        } else {
            // Actualizar objetivo
            updateObjetivo(state.data)
        }
        onClose()

    }, [state])

    return (
        <Modal className="z-50" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="bg-secondary">
                            <i className="ri-focus-2-line text-white text-xl me-2"></i>
                            <p className="font-bold text-white">{objetivo ? 'Editar' : 'Crear nuevo'} objetivo</p>
                        </ModalHeader>
                        <form action={formAction}>
                            <ModalBody className="max-h-[500px] overflow-y-auto">
                                {objetivo &&
                                    /*  <Button variant="flat" color="primary" className="py-8 px-4 mt-3" startContent={<i className="ri-check-line text-lg"></i>}>
                                         <span>Marcar objetivo como completado</span>
                                     </Button> */
                                    <Switch
                                        name="completado"
                                        value={true}
                                        defaultSelected={objetivo.fecha_completado}
                                        classNames={{
                                            base: cn(
                                                "mt-3 inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-primary/20 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary data-[selected=true]:bg-primary/20",
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4",
                                            ),
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="space-x-2 text-primary flex items-center">
                                                <i className="ri-checkbox-circle-line text-lg"></i>
                                                <span className="text-sm">Marcar objetivo como completado</span>
                                            </p>
                                        </div>
                                    </Switch>
                                    ||
                                    <p className="bg-primary/20 py-2 px-4 mt-2 rounded-xl">Marcate un nuevo objetivo, define cuales son tus metas a cumplir.</p>
                                }
                                <p aria-live="polite" className="sr-only">
                                    {state?.message}
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
                                        defaultValue={objetivo?.titulo}
                                        isInvalid={!!state?.errors?.titulo}
                                        errorMessage={state?.errors?.titulo}
                                    />
                                    <Textarea
                                        name="descripcion"
                                        label="Descripción"
                                        labelPlacement="outside"
                                        placeholder="El objetivo trata de.."
                                        defaultValue={objetivo?.descripcion}
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
                                                defaultValue={objetivo?.dificultad}
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
                                            defaultValue={objetivo?.importancia}
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
                                <Button color="danger" variant="light" onPress={onClose}>Cancelar</Button>
                                <Button isLoading={pending} type="submit" color="primary">Guardar</Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}