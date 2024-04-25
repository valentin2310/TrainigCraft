'use client'

import { fetchCategorias, fetchEventos, fetchRutinas } from "@/app/lib/data"
import { UserContext } from "@/app/providers"
import { useRutinas } from "@/app/stores/use-rutinas"
import Calendar from "@/app/ui/calendario/calendario"
import { use, useEffect, useState } from "react"
import { usecategorias } from "@/app/stores/use-categorias"

export default function Page() {

    const user = use(UserContext)

    const {rutinas, setRutinas, filteredRutinas, setFilteredRutinas} = useRutinas()
    const {categorias, setCategorias} = usecategorias()
    const [eventos, setEventos] = useState([])

    const fetchData = async () => {
        const _rutinas = await fetchRutinas(user.id);
        setRutinas(_rutinas)

        const _categorias = await fetchCategorias(user.id);
        setCategorias(_categorias)

        const _eventos = await fetchEventos(user.id);
        setEventos(_eventos)
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
        <div className="mb-5">
            <p className="text-3xl font-semibold text-primary mb-3">Calendario</p>
            <p>Planifica tus entrenamientos de forma sencilla, selecciona el día que quieras y añade la rutina que quieras hacer.</p>
            <p>También puedes ver la información de las rutinas haciendo click sobre ellas, para tener toda la información detallada, selecciona <span className="text-primary">ver más</span>.</p>
            <p>Puedes eliminar la rutina para cierto día haciendo click sobre la misma y dandole a <span className="text-red-500">quitar</span>.</p>
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