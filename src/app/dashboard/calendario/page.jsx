'use client'

import { fetchRutinas } from "@/app/lib/data"
import { UserContext } from "@/app/providers"
import { useRutinas } from "@/app/stores/use-rutinas"
import Calendar from "@/app/ui/calendario/calendario-prueba"
import { use, useEffect } from "react"

export default function Page() {

    const user = use(UserContext)

    const {rutinas, setRutinas} = useRutinas()

    const fetchData = async () => {
        const _rutinas = await fetchRutinas(user.id);
        setRutinas(_rutinas)
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
                    list={rutinas}
                />
            </div>
        </>
    )
}