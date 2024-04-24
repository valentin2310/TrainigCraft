'use client'

import { useEffect, useState } from "react";
import { Input, Select, SelectItem, Chip } from "@nextui-org/react";

export default function FiltroRutinas({ rutinas, categorias, setFilteredRutinas }) {
    /* Filtro */
    const [filtroName, setFiltroName] = useState('')
    const [filtroCategoria, setFiltroCategoria] = useState(undefined)

    const filtrar = () => {
        let newList = rutinas.filter((item) => item.titulo.toLowerCase().includes(filtroName.toLowerCase()))

        if (filtroCategoria) {
            const _filter_categoria = Array.from(filtroCategoria)

            if (_filter_categoria.length > 0) {
                newList = newList.filter((item) => {
                    const _categorias = item.categorias
                    const hasCategoria = _categorias.find((item) => _filter_categoria.includes(item.id))

                    return !!hasCategoria;
                })
            }
        }

        setFilteredRutinas(newList)
    }

    useEffect(() => {
        if (!rutinas || rutinas.length == 0) return

        const timeout = setTimeout(() => {
            filtrar()

        }, 800)

        return () => clearTimeout(timeout)

    }, [filtroName, filtroCategoria])

    return (
        <>
            <Input
                label="Filtra por nombre"
                placeholder="Rutina de.."
                value={filtroName}
                onValueChange={setFiltroName}
                className="col-span-6"
                labelPlacement="outside"
            />
            <Select
                name="categorias[]"
                items={categorias}
                label="Categorías"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Filtro por categoria"
                className="col-span-4"
                labelPlacement="outside"
                selectedKeys={filtroCategoria}
                onSelectionChange={setFiltroCategoria}
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
        </>
    )
}