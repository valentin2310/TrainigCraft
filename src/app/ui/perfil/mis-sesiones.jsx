'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, useDisclosure } from "@nextui-org/react"
import {  fetchSesionesEntrenamiento } from "@/app/lib/data"
import { useSesionesEntrenamiento } from "@/app/stores/use-sesiones-entrenamiento"
import GridSesiones from "@/app/ui/sesiones/grid-sesiones"

export default function MisSesiones() {
    const user = use(UserContext)
    const { sesiones, setSesiones } = useSesionesEntrenamiento()

    const fetchData = async () => {
        const _sesiones = await fetchSesionesEntrenamiento(user.id)
        setSesiones(_sesiones)
    }

    useEffect(() => {
        if (!user) return
        
        fetchData()
        
    }, [user])

    return (
        <>
             <div className="w-full flex justify-between items-center mb-2">
                {/* <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p> */}
                <p className="text-lg xl:text-xl text-primary font-semibold">TODAS LAS SESIONES DE ENTRENAMIENTO</p>
                <div className="flex gap-1 sm:gap-2">
                    {/* <Button className="sm:hidden rounded-full" size="sm" onPress={onOpen} variant="flat" color="primary" isIconOnly startContent={<i className="ri-add-circle-line"></i>} />
                    
                    <Button className="hidden sm:flex" onPress={onOpen} variant="flat" color="primary" startContent={<i className="ri-add-circle-line text-lg"></i>}>
                        <span>Añadir</span>
                    </Button> */}
                </div>
             </div>
            
            <div className="max-h-[550px] md:max-h-none overflow-y-auto">
                <GridSesiones lista={sesiones} />
            </div>
            
        </>
    )
}