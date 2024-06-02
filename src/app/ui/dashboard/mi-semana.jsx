'use client'

import { fetchEventosSemanal } from "@/app/lib/data"
import { UserContext } from "@/app/providers"
import { Button, Link } from "@nextui-org/react"
import clsx from "clsx"
import { use, useEffect, useState } from "react"

const SEMANA = [
    {
        'dia': 'Lunes',
        'simbolo': 'L',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Martes',
        'simbolo': 'M',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Miércoles',
        'simbolo': 'X',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Jueves',
        'simbolo': 'J',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Viernes',
        'simbolo': 'V',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Sábado',
        'simbolo': 'S',
        'estado': null,
        'hoy': false
    },
    {
        'dia': 'Domingo',
        'simbolo': 'D',
        'estado': null,
        'hoy': false
    },
]

export default async function MiSemana() {
    const user = use(UserContext);
    const [eventos, setEventos] = useState([])
    const [semana, setSemana] = useState([]);

    const fetchData = async () => {
        const _eventos = await fetchEventosSemanal(user.id)
        setEventos(_eventos)

        const numberdayweek = [6,0,1,2,3,4,5];
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0)

        const currentDayWeek = numberdayweek[currentDate.getDay()]
        SEMANA[currentDayWeek].hoy = true;

        _eventos.forEach(item => {
            const fecha = new Date(item.date);
            fecha.setHours(23, 59, 59)
            const dia = numberdayweek[fecha.getDay()]

            if (SEMANA[dia].estado == "completado") return;

            if (currentDate <= fecha && !item.isCompletado) {
                SEMANA[dia].estado = "pendiente";
                return;
            } 
            
            if (!item.isCompletado) {
                SEMANA[dia].estado = "incompleto";
                return;
            } 
            
            SEMANA[dia].estado = "completado";
        })

        setSemana(SEMANA)
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <div className="misemana w-full">
            <div className="w-full flex justify-between items-center mb-2">
                <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-calendar-schedule-line me-2"></i>Mi semana</p>
                <div className="flex gap-1 sm:gap-2">
                    <Link href="/dashboard/calendario">
                        <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-edit-2-line"></i>} />

                        <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-edit-2-line text-lg"></i>}>
                            <span>Editar</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full md:px-2 flex justify-evenly sm:gap-1 lg:gap-2 rounded bg-gradient-to-br from-gray-100 to-gray-50 sm:bg-none">
                {semana.map((dia) => {
                    const icon = dia.estado == "completado" ? 'ri-checkbox-circle-line text-primary' : (dia.estado == "pendiente" ? 'ri-hourglass-2-fill text-blue-500' : (dia.estado == 'incompleto' ? 'ri-close-circle-line text-danger' : 'ri-checkbox-blank-circle-line'))

                    return (
                        <div key={dia.simbolo} className={clsx("flex flex-col gap-0 items-center py-2 md:p-2 lg-p-4 w-full sm:bg-gradient-to-br from-gray-100 to-gray-50 text-secondary sm:rounded sm:shadow text-xs md:text-md",
                            {'bg-gradient-to-br from-primary/20 to-primary/10' : dia.hoy}
                        )}>
                            <div className={clsx({'text-primary font-semibold' : dia.hoy})}>
                                <p className="hidden md:block">{dia.dia}</p>
                                <p className="md:hidden">{dia.simbolo}</p>
                            </div>
                            <i className={`${icon} text-sm md:text-xl lg:text-3xl`}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}