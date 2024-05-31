'use client'

import { useEffect, useState } from "react";
import { Input, Select, SelectItem, Chip, Button } from "@nextui-org/react";

export default function FiltroEjercicios({ ejercicios, musculos, setFilteredEjercicios }) {
    /* Filtro */
    const [filtroName, setFiltroName] = useState('')
    const [filtroMusculos, setFiltroMusculos] = useState(undefined)

    const filtrar = () => {
        let newList = ejercicios.filter((item) => item.nombre.toLowerCase().includes(filtroName.toLowerCase()))

        if (filtroMusculos) {
            const _filterMusculos = Array.from(filtroMusculos)
            console.log(_filterMusculos)

            if (_filterMusculos.length > 0) {
                newList = newList.filter((item) => {
                    const _musculos = item.musculos
                    console.log(_musculos)
                    const hasMusculos = _musculos.find((item) => _filterMusculos.includes(item))
                    console.log(hasMusculos)

                    return !!hasMusculos;
                })
            }
        }

        setFilteredEjercicios(newList)
    }

    useEffect(() => {
        if (!musculos || musculos.length == 0) return

        const timeout = setTimeout(() => {
            filtrar()

        }, 800)

        return () => clearTimeout(timeout)

    }, [filtroName, filtroMusculos])

    return (
        <>
            <Input
                label="Filtra por nombre"
                placeholder="Ejercicio de.."
                value={filtroName}
                onValueChange={setFiltroName}
                className="col-span-12 md:col-span-6"
                labelPlacement="outside"
                startContent={<i className="ri-search-line text-primary"></i>}
            />
            <Select
                name="musculos[]"
                items={musculos}
                label="Músculos"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Filtro por musculos"
                className="col-span-12 md:col-span-4"
                labelPlacement="outside"
                selectedKeys={filtroMusculos}
                startContent={<i className="ri-price-tag-3-line text-primary"></i>}
                onSelectionChange={setFiltroMusculos}
                renderValue={(items) => (
                    <div className="flex flex-wrap gap-2 py-1">
                        {items.map((item) => (
                            <Chip key={item.key} variant="flat">
                                {item.data.nombre}
                            </Chip>
                        ))}
                    </div>
                )}
            >
                {(musculo) => (
                    <SelectItem key={musculo.nombre} value={musculo.nombre} textValue={musculo.nombre}>
                        <span><i className="ri-price-tag-3-line text-primary me-1"></i>{musculo.nombre}</span>
                    </SelectItem>
                )}
            </Select>
        </>
    )
}