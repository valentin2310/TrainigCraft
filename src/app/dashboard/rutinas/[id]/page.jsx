'use client'

import { fetchEjerciciosRutina, fetchItem } from "@/app/lib/data";
import { UserContext } from "@/app/providers";
import { use, useEffect, useState } from "react"
import { format } from "rsuite/esm/utils/dateUtils";
import TablaEjerciciosSimple from "@/app/ui/rutinas/tabla-ejercicios-simple";

export default function Page({ params }) {
    const { id: idRutina } = params
    const [rutina, setRutina] = useState(null)

    const user = use(UserContext)

    const [ejerciciosRutina, setEjerciciosRutina] = useState([]);


    const fetchData = async () => {
        const _rutina = await fetchItem(`usuarios/${user.id}/rutinas/${idRutina}`)
        setRutina(_rutina)

        const _rutina_ejercicios = await fetchEjerciciosRutina(_rutina.ejercicios);
        setEjerciciosRutina(_rutina_ejercicios);
        console.log(_rutina_ejercicios)

    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    const calcularFecha = (timestamp) => {
        const { seconds, nanoseconds } = timestamp

        const date = new Date(seconds * 1000 + nanoseconds / 1000000)
        const formattedDate = format(date, 'd/M/yyyy')

        return formattedDate;
    }

    const calcularDificultad = () => {
        if (!ejerciciosRutina || ejerciciosRutina.length == 0) return 0

        let sum = 0;

        ejerciciosRutina.forEach((item) => {
            sum += item.ejercicio.dificultad
        })

        return sum / ejerciciosRutina.length
    }

    return (
        <>
            <div className="bg-gradient-to-b from-dark to-dark/75 text-white py-5 rounded shadow-lg">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-semibold text-primary mb-1">{rutina?.titulo}</h1>
                    <p className="px-2">{rutina?.descripcion}</p>
                </div>

                {/* Stats */}
                <div className="flex justify-evenly gap-5">
                    {rutina &&
                        <>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl">{calcularFecha(rutina.created_at)}</span>
                                <span className="text-tiny">Fecha creación</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl">{rutina.sesiones}</span>
                                <span className="text-tiny">Sesiones</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl">{calcularDificultad()}</span>
                                <span className="text-tiny">Dificultad media</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl">3</span>
                                <span className="text-tiny">Ejercicios</span>
                            </div>
                        </>
                    }
                </div>
            </div>

            <div className="col-span-6 py-10">
                {rutina &&
                    <TablaEjerciciosSimple data={ejerciciosRutina} />
                }
            </div>
        </>
    )
}