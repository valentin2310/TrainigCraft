
'use client'

import { useEffect, useState } from "react";
import TablaEjercicios from "@/app/ui/rutinas/tabla-ejercicios";
import { Input, Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { z } from "@/zod/zod-es";
import clsx from "clsx";
import ModalPickEjercicio from "@/app/ui/ejercicios/modal-pick-ejercicio";
import { useMusculos } from "@/app/stores/use-musculos";
import { useEjercicios } from "@/app/stores/use-ejercicios";

const SCHEMA_EJERCICIO_RUTINA = z.object({
    tipo: z.string(),
    series: z.number().positive(),
    repeticiones: z.number().positive(),
    ejercicioId: z.string(),
    peso: z.number().nonnegative().optional()
})

const initialState = { message: '' };

export default function RutinaFormEjercicios({ ejercicios, ejerciciosRutina, setEjerciciosRutina, message }) {
    const [state, setState] = useState(initialState);
    const [tipo, setTipo] = useState("reps")
    const [series, setSeries] = useState(1)
    const [repeticiones, setRepeticiones] = useState(1)
    const [ejercicio, setEjercicio] = useState(undefined)
    const [peso, setPeso] = useState(0)

    const [selectedEjercicio, setSelectedEjercicio] = useState(undefined)
    const { filteredEjercicios, setFilteredEjercicios } = useEjercicios()
    const { musculos, getDefault } = useMusculos()

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const fetchData = async () => {
        setFilteredEjercicios(ejercicios)
        getDefault()
    }

    const handleSubmit = () => {
        /* Obtener datos del form */
        const rawData = {
            tipo: tipo,
            series: parseInt(series),
            repeticiones: parseInt(repeticiones),
            ejercicioId: selectedEjercicio?.id,
            peso: parseFloat(peso),
            ejercicio: null
        }

        /* Validar que los datos son válidos */
        const validatedFileds = SCHEMA_EJERCICIO_RUTINA.safeParse(rawData)

        if (!validatedFileds.success) {
            setState({
                errors: validatedFileds.error.flatten().fieldErrors
            })
            console.log(state)

            return
        }

        /* Formatear los datos */
        rawData.ejercicio = {...selectedEjercicio};
        
        /* Guardar lso datos */
        setEjerciciosRutina([...ejerciciosRutina, rawData]);

        /* Limpiar el form */
        setState(initialState)
        setTipo('reps')
        setSeries(1)
        setRepeticiones(1)
        setSelectedEjercicio(undefined)
        setPeso(0)

    }

    useEffect(() => {
        if (!ejercicios) return

        fetchData()

    }, [ejercicios])

    return (
        <>
            <div className="mb-3 text-small">
                <p className={clsx({ 'text-red-500' : message })}>Ejercicios de la rutina *</p>
                {message && <p className="text-red-500 text-tiny">{message}</p>}
            </div>

            <div>
                <div className="grid grid-cols-12 gap-1 xl:gap-3 mb-3">
                    <Select
                        name="tipo"
                        label="Tipo"
                        selectedKeys={[tipo]}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                        isInvalid={!!state?.errors?.tipo}
                        errorMessage={state?.errors?.tipo}
                        className="col-span-12 md:col-span-3 xl:col-span-2 2xl:col-span-1 order-1"
                        classNames={{
                            trigger: "py-2",
                        }}
                    >
                        <SelectItem key={'reps'} value={'reps'}>
                            reps
                        </SelectItem>
                        <SelectItem key={'tiempo'} value={'tiempo'}>
                            tiempo
                        </SelectItem>
                    </Select>
                    <Input
                        name="series"
                        label="Series"
                        type="number"
                        value={series}
                        onValueChange={setSeries}
                        required
                        isInvalid={!!state?.errors?.series}
                        errorMessage={state?.errors?.series}
                        className="col-span-6 md:col-span-3 xl:col-span-1 order-2"
                    />
                    <Input
                        name="reps"
                        label={tipo == 'reps' ? 'Repeticiones' : 'Duración(s)'}
                        type="number"
                        value={repeticiones}
                        onValueChange={setRepeticiones}
                        required
                        isInvalid={!!state?.errors?.repeticiones}
                        errorMessage={state?.errors?.repeticiones}
                        className="col-span-6 md:col-span-3 xl:col-span-2 2xl:col-span-1 order-3"
                    />
                    <Input
                        label="Ejercicio"
                        value={selectedEjercicio?.nombre}
                        placeholder="Selecciona un ejercicio.."
                        required
                        isReadOnly
                        onClick={onOpen}
                        isInvalid={!!state?.errors?.ejercicioId}
                        errorMessage={state?.errors?.ejercicioId}
                        className="col-span-12 md:col-span-11 xl:col-span-4 2xl:col-span-7 order-4"
                    />
                    <div className="hidden">
                        <Input
                            hidden
                            name="ejercicioId"
                            value={selectedEjercicio?.id}
                        />
                    </div>
                    <Input
                        name="peso"
                        label="Peso (kg)"
                        type="number"
                        value={peso}
                        onValueChange={setPeso}
                        isInvalid={!!state?.errors?.peso}
                        errorMessage={state?.errors?.peso}
                        className="col-span-12 md:col-span-3 xl:col-span-2 2xl:col-span-1 order-6 md:order-3 xl:order-6"
                    />
                    <Button className="h-14 order-7 col-span-12 md:col-span-1 w-full block xl:hidden" color="primary" variant="flat" startContent={<i className="ri-add-circle-fill text-lg"></i>} onClick={handleSubmit} isIconOnly />
                    <Button className="h-14 order-7 col-span-12 md:col-span-1 w-full hidden xl:block" color="primary" variant="flat" onClick={handleSubmit}>Añadir</Button>
                </div>
            </div>

            <div className="py-3">
                <TablaEjercicios data={ejerciciosRutina} setData={setEjerciciosRutina} />
            </div>

            {/* Modal seleccionar ejercicio */}
            <ModalPickEjercicio 
                isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}
                ejercicios={ejercicios} musculos={musculos}
                filteredEjercicios={filteredEjercicios}
                setFilteredEjercicios={setFilteredEjercicios}
                selectedEjercicio={selectedEjercicio}
                setSelectedEjercicio={setSelectedEjercicio}
            />
        </>
    )
}