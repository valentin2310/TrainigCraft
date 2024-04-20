
'use client'

import { useState } from "react";
import TablaEjercicios from "@/app/ui/rutinas/tabla-ejercicios";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { z } from "zod";
import clsx from "clsx";

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
    const [ejercicio, setEjercicio] = useState(0)
    const [peso, setPeso] = useState(0)

    const handleSubmit = () => {
        /* Obtener datos del form */
        const rawData = {
            tipo: tipo,
            series: parseInt(series),
            repeticiones: parseInt(repeticiones),
            ejercicioId: ejercicio,
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
        const selectedEjercicio = ejercicios.find((item) => item.id == rawData.ejercicioId)
        const { path, ...restDataEjercicio } = selectedEjercicio;
        rawData.ejercicio = {...restDataEjercicio};
        
        /* Guardar lso datos */
        setEjerciciosRutina([...ejerciciosRutina, rawData]);

        /* Limpiar el form */
        setState(initialState)
        setTipo('reps')
        setSeries(1)
        setRepeticiones(1)
        setEjercicio(null)
        setPeso(0)

    }

    return (
        <>
            <div className="mb-5">
                <p className={clsx({ 'text-red-500' : message })}>Ejercicios de la rutina *</p>
                {message && <p className="text-red-500 text-tiny">{message}</p>}
            </div>

            <div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input
                        name="tipo"
                        value={tipo}
                        onValueChange={setTipo}
                        label="Tipo de ejercicio"
                        required
                        isInvalid={!!state?.errors?.tipo}
                        errorMessage={state?.errors?.tipo}
                    />
                    <Input
                        name="series"
                        label="Series"
                        type="number"
                        value={series}
                        onValueChange={setSeries}
                        required
                        isInvalid={!!state?.errors?.series}
                        errorMessage={state?.errors?.series}
                    />
                    <Select
                        label="Ejercicio"
                        name="ejercicio"
                        items={ejercicios}
                        selectedKeys={[ejercicio]}
                        onChange={(e) => setEjercicio(e.target.value)}
                        labelPlacement="outside"
                        required
                        isInvalid={!!state?.errors?.ejercicio}
                        errorMessage={state?.errors?.ejercicio}
                        classNames={{
                            trigger: "py-2"
                        }}
                    >
                        {(item) => (
                            <SelectItem key={item.id} value={item.id} textValue={item.nombre}>
                                <span>{item.nombre}</span>
                            </SelectItem>
                        )}
                    </Select>
                    <Input
                        name="reps"
                        label="Repeticiones"
                        type="number"
                        value={repeticiones}
                        onValueChange={setRepeticiones}
                        required
                        isInvalid={!!state?.errors?.repeticiones}
                        errorMessage={state?.errors?.repeticiones}
                    />
                    <Input
                        name="peso"
                        label="Peso/Lastre"
                        type="number"
                        value={peso}
                        onValueChange={setPeso}
                        isInvalid={!!state?.errors?.peso}
                        errorMessage={state?.errors?.peso}
                    />
                </div>
                <Button onClick={handleSubmit}>Añadir</Button>
            </div>

            <div className="py-3">
                <TablaEjercicios data={ejerciciosRutina} setData={setEjerciciosRutina} />
            </div>
        </>
    )
}