'use client'

import { use, useEffect, useMemo, useState } from "react";
import { useEjercicios } from "@/app/stores/use-ejercicios";
import { usecategorias } from "@/app/stores/use-categorias";
import { UserContext } from "@/app/providers";
import { fetchCategorias, fetchEjercicios } from "@/app/lib/data";
import RutinaForm from "@/app/ui/rutinas/form";

export default function Page() {
    const user = use(UserContext)

    const { categorias, setCategorias } = usecategorias()
    const { ejercicios, setEjercicios } = useEjercicios()
    

    const fetchData = async () => {
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
            <div className="mb-3">
                <h1 className="text-3xl font-semibold text-primary mb-1">Crea una nueva Rutina</h1>
                <p className="max-w-[800px] px-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit voluptatem, vitae impedit quae magni quasi error consequuntur corporis.</p>
            </div>

            {user && 
                <RutinaForm 
                    idUser={user.id}
                    categorias={categorias}
                    ejercicios={ejercicios}
                />
            }
        </>
    )
}