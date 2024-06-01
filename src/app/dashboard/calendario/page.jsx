'use client'

import { fetchCategorias, fetchEventos, fetchRutinas } from "@/app/lib/data"
import { UserContext } from "@/app/providers"
import { useRutinas } from "@/app/stores/use-rutinas"
import Calendar from "@/app/ui/calendario/calendario"
import { use, useEffect, useState } from "react"
import { usecategorias } from "@/app/stores/use-categorias"

export default function Page() {

    const user = use(UserContext)

    const { rutinas, setRutinas, filteredRutinas, setFilteredRutinas } = useRutinas()
    const { categorias, setCategorias } = usecategorias()
    const [eventos, setEventos] = useState([])

    const fetchData = async () => {
        const _rutinas = await fetchRutinas(user.id);
        setRutinas(_rutinas)

        const _categorias = await fetchCategorias(user.id);
        setCategorias(_categorias)

        const _eventos = await fetchEventos(user.id);
        setEventos(_eventos)
        console.log(_eventos)
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="mb-5">
                <p className="text-3xl font-semibold text-primary mb-3">Calendario</p>
                <p>Para planificar tu entrenamiento, selecciona un día y añade las rutinas que quieras hacer.</p>
                <p>Seleccionando una rutina puedes <span className="text-primary">ver su información</span>, además de poder <span className="text-red-500">quitarla</span> de tu planificación.</p>
                <p className="text-sm mt-2">Leyenda:</p>
                <div className="flex gap-2 text-tiny">
                    <div className="bg-red-500 rounded p-2 text-white">
                        <span><i className="ri-close-circle-line me-2"></i>No realizado</span>
                    </div>
                    <div className="bg-primary rounded p-2 text-white">
                        <span><i className="ri-checkbox-circle-line me-2"></i>Realizado</span>
                    </div>
                    <div className="bg-blue-500 rounded p-2 text-white">
                        <span><i className="ri-hourglass-2-fill me-2"></i>Pendiente</span>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <Calendar
                    eventos={eventos}
                    setEventos={setEventos}
                    rutinas={rutinas}
                    categorias={categorias}
                    filteredRutinas={filteredRutinas}
                    setFilteredRutinas={setFilteredRutinas}
                    userId={user?.id}
                />
            </div>
        </>
    )
}