'use client'

import { Button, Input, Textarea, Select, SelectItem, Chip, CheckboxGroup, Checkbox, Avatar, cn, useDisclosure } from "@nextui-org/react"
import { use, useEffect, useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'
import { addRutina, editRutina } from "@/app/lib/rutina-actions";
import { useRutinas } from "@/app/stores/use-rutinas";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import RutinaFormEjercicios from "@/app/ui/rutinas/form-ejercicios";
import CategoriaModalForm from "@/app/ui/rutinas/modal-form-categoria";

const initialState = {
    message: ''
}

export default function RutinaForm({ idUser, rutina = null, ejercicios, categorias }) {
    const router = useRouter()
    
    const { storeRutina, updateRutina } = useRutinas()
    const [ejerciciosRutina, setEjerciciosRutina] = useState(rutina ? rutina.ejercicios : []);

    const addRutinaWithParams = addRutina.bind(null, { idUser: idUser, list: ejerciciosRutina})
    const editRutinaWithParams = editRutina.bind(null, { path: rutina?.path, list: ejerciciosRutina})

    const [state, formAction] = useFormState(rutina ? editRutinaWithParams : addRutinaWithParams, initialState)
    const { pending } = useFormStatus()

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen : isOpenCategoria, onOpen : onOpenCategoria, onClose : onCloseCategoria, onOpenChange : onOpenChangeCategoria } = useDisclosure()


    const cancel = () => {
        router.push('/dashboard/rutinas')
    }

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

        router.push('/dashboard/rutinas')

    }, [state])

    return (
        <>
            <form action={formAction}>
                <div className="px-5 py-8 flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="grid lg:grid-cols-2 items-start gap-3">
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
                            <div className="flex gap-2 items-end">
                                <Select
                                    name="categorias[]"
                                    items={categorias}
                                    label="Categorías"
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    placeholder="Pertenece a la categoría/as.."
                                    labelPlacement="outside"
                                    defaultSelectedKeys={rutina?.categorias.map((cat) => (cat.id))}
                                    isInvalid={!!state?.errors?.categorias}
                                    errorMessage={state?.errors?.categorias}
                                    renderValue={(items) => (
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item) => (
                                                <Chip key={item.key} variant="flat" startContent={<i className="ri-price-tag-3-line text-primary" style={{ color: item.data.color }}></i>}>
                                                    {item.data.nombre}
                                                </Chip>
                                            ))}
                                        </div>
                                    )}
                                >
                                    {(categoria) => (
                                        <SelectItem key={categoria.id} value={categoria.id} textValue={categoria.nombre}>
                                            <span><i className="ri-price-tag-3-line text-primary me-1" style={{ color: categoria.color }}></i>{categoria.nombre}</span>
                                        </SelectItem>
                                    )}
                                </Select>
                                <Button className="ps-5 pe-8" 
                                    color="primary" variant="flat" 
                                    startContent={<i className="ri-add-circle-line text-lg ps-3"></i>}
                                    onPress={onOpenCategoria}
                                >
                                    Nueva categoría
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            name="descripcion"
                            label="Descripción"
                            labelPlacement="outside"
                            placeholder="La rutina trata de.."
                            defaultValue={rutina?.descripcion}
                            isInvalid={!!state?.errors?.descripcion}
                            errorMessage={state?.errors?.descripcion}
                        />
                    </div>

                    <div className="">
                        <RutinaFormEjercicios 
                            ejercicios={ejercicios}
                            ejerciciosRutina={ejerciciosRutina}
                            setEjerciciosRutina={setEjerciciosRutina} 
                            message={state?.errors?.ejercicios}
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button onClick={cancel} color="danger" size="lg" variant="light">Cancelar</Button>
                    <Button isLoading={pending} type="submit" size="lg" color="primary" startContent={<i className="ri-save-2-line text-xl"></i>}>Guardar</Button>
                </div>
            </form>

            {/* Modal crear categorias */}
            <CategoriaModalForm
                isOpen={isOpenCategoria}
                onClose={onCloseCategoria}
                onOpenChange={onOpenChangeCategoria}
                idUser={idUser}
            />
        </>
    )
}