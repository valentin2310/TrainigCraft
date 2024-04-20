'use client'

import { use, useEffect, useState } from "react";
import { useEjercicios } from "@/app/stores/use-ejercicios";
import { usecategorias } from "@/app/stores/use-categorias";
import { UserContext } from "@/app/providers";
import { fetchCategorias, fetchItem, fetchEjerciciosRutina, fetchEjercicios } from "@/app/lib/data";
import RutinaForm from "@/app/ui/rutinas/form";

export default function Page({ params }) {
    const { id: idRutina } = params
    const [ rutina, setRutina ] = useState(null)

    const user = use(UserContext)

    const { categorias, setCategorias } = usecategorias()
    const { ejercicios, setEjercicios } = useEjercicios()

    const fetchData = async () => {
        const _rutina = await fetchItem(`usuarios/${user.id}/rutinas/${idRutina}`)
        const _rutina_ejercicios = await fetchEjerciciosRutina(_rutina.path);
        _rutina.ejercicios = _rutina_ejercicios;
        setRutina(_rutina)

        const _ejercicios = await fetchEjercicios(user.id)
        setEjercicios(_ejercicios)

        const _categorias = await fetchCategorias(user.id)
        setCategorias(_categorias)
    }

    useEffect(() => {
        if (!user) return
        
        fetchData()

    }, [user])

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-primary mb-1">Editar la rutina "{rutina?.titulo}"</h1>
                <p className="max-w-[800px] px-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit voluptatem, vitae impedit quae magni quasi error consequuntur corporis.</p>
            </div>

            {rutina && 
                <RutinaForm 
                    rutina={rutina}
                    categorias={categorias}
                    ejercicios={ejercicios}
                />
            }
        </>
    )
}