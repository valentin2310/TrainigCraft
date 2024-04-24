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
            <p className="text-3xl mb-3">Calendario</p>

            <div className="w-full max-h-[1200px] overflow-y-auto">
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