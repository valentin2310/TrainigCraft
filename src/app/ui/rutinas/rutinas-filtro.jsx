'use client'

import { useEffect, useState } from "react";
import { Input, Select, SelectItem, Chip, Button } from "@nextui-org/react";

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
                startContent={<i className="ri-search-line text-primary"></i>}
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
                startContent={<i className="ri-price-tag-3-line text-primary"></i>}
                onSelectionChange={setFiltroCategoria}
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
                {(categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id} textValue={categoria.nombre}>
                        <span><i className="ri-price-tag-3-line text-primary me-1" style={{ color: categoria.color }}></i>{categoria.nombre}</span>
                    </SelectItem>
                )}
            </Select>
        </>
    )
}