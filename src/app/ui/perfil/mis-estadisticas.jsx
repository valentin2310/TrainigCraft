'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button } from "@nextui-org/react"
import { useObjetivos } from "@/app/stores/use-objetivos"
import CardEstadisticas from "../estadisticas/card-estadisticas"
import CardEstadistica from "../estadisticas/card-estadistica"

export default function MisEstadisticas({ idUser }) {
    const user = use(UserContext)
    const { objetivos, setObjetivos } = useObjetivos()

    const fetchData = async () => {
        
    }

    useEffect(() => {
        if (!user) return
        
        fetchData()
        
    }, [user])

    return (
        <>
             <div className="w-full flex justify-between items-center my-2">
                {/* <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p> */}
                <p className="text-lg xl:text-xl text-primary font-semibold">ESTADÍSTICAS GENERALES</p>
             </div>

             <div className="grid lg:grid-cols-2 gap-5">
                <CardEstadisticas title="Objetivos">
                    <CardEstadistica title="Total" display={30} />
                    <CardEstadistica title="Completado" display={8} />
                    <CardEstadistica title="Dificultad media" display={3.5} />
                </CardEstadisticas>

                <CardEstadisticas title="Rutinas">
                    <CardEstadistica title="Total" display={8} />
                    <CardEstadistica title="Sesiones" display={3} />
                    <CardEstadistica title="Dificultad media" display={4.8} />
                </CardEstadisticas>

                <CardEstadisticas title="Ejercicios">
                    <CardEstadistica title="Total" display={8} />
                    <CardEstadistica title="Ejercicio más usado" display={"Flexiones"} />
                    <CardEstadistica title="Dificultad media" display={4.8} />
                </CardEstadisticas>
             </div>
            
        </>
    )
}