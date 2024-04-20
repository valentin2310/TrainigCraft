'use client'

import { fetchDefaultEjercicios, fetchEjerciciosRutina, fetchItem } from "@/app/lib/data";
import { UserContext } from "@/app/providers";
import { useEjercicios } from "@/app/stores/use-ejercicios";
import { use, useEffect, useState } from "react"
import RutinaFormEjercicios from "@/app/ui/rutinas/form-ejercicios";

export default function Page({ params }) {
    const { id: idRutina } = params
    const [rutina, setRutina] = useState(null)

    const user = use(UserContext)

    const { ejercicios, setEjercicios } = useEjercicios()
    const [ejerciciosRutina, setEjerciciosRutina] = useState([]);


    const fetchData = async () => {
        const _rutina = await fetchItem(`usuarios/${user.id}/rutinas/${idRutina}`)
        setRutina(_rutina)

        const _rutina_ejercicios = await fetchEjerciciosRutina(_rutina.path);
        setEjerciciosRutina(_rutina_ejercicios);

        const _ejercicios = await fetchDefaultEjercicios()
        setEjercicios(_ejercicios)
        
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-primary mb-1">{rutina?.titulo}</h1>
                <p className="max-w-[800px] px-2">{rutina?.descripcion}</p>
            </div>

            <div className="col-span-6 py-10">
                {rutina && 
                    <RutinaFormEjercicios
                        ejercicios={ejercicios}
                        ejerciciosRutina={ejerciciosRutina}
                        setEjerciciosRutina={setEjerciciosRutina}
                    />
                }
            </div>
        </>
    )
}