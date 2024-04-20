'use client'

import { Button, Input, Textarea, Select, SelectItem, Chip, CheckboxGroup, Checkbox, Avatar, cn } from "@nextui-org/react"
import { use, useEffect, useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'
import { addRutina, editRutina } from "@/app/lib/rutina-actions";
import { useRutinas } from "@/app/stores/use-rutinas";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import RutinaFormEjercicios from "@/app/ui/rutinas/form-ejercicios";

const initialState = {
    message: ''
}

export default function RutinaForm({ idUser = null, rutina = null, ejercicios, categorias }) {
    const router = useRouter()
    
    const { storeRutina, updateRutina } = useRutinas()
    const [ejerciciosRutina, setEjerciciosRutina] = useState(rutina ? rutina.ejercicios : []);

    const addRutinaWithParams = addRutina.bind(null, { idUser: idUser, list: ejerciciosRutina})
    const editRutinaWithParams = editRutina.bind(null, { path: rutina?.path, list: ejerciciosRutina})

    const [state, formAction] = useFormState(rutina ? editRutinaWithParams : addRutinaWithParams, initialState)
    const { pending } = useFormStatus()

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
                <div className="my-10 grid grid-cols-2 gap-5 px-10">
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
                        defaultSelectedKeys={rutina?.categorias.map((cat) => (cat.id))}
                        isInvalid={!!state?.errors?.categorias}
                        errorMessage={state?.errors?.categorias}
                        renderValue={(items) => (
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <Chip key={item.key} color="default" variant="bordered" startContent={<i className="ri-circle-fill" style={{ color: item.data.color }}></i>}>
                                        {item.data.nombre}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    >
                        {(categoria) => (
                            <SelectItem key={categoria.id} value={categoria.id} textValue={categoria.nombre}>
                                <span style={{ color: categoria.color }}>{categoria.nombre}</span>
                            </SelectItem>
                        )}
                    </Select>
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

                <div className="py-10">
                    <RutinaFormEjercicios 
                        ejercicios={ejercicios}
                        ejerciciosRutina={ejerciciosRutina}
                        setEjerciciosRutina={setEjerciciosRutina} 
                        message={state?.errors?.ejercicios}
                    />
                </div>

                <Button onClick={cancel} color="danger" variant="light">Cancelar</Button>
                <Button isLoading={pending} type="submit" color="primary">Guardar</Button>
            </form>
        </>
    )
}