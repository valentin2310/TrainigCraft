'use client'

import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"
import { useEffect, useState } from "react"
import GridSesiones from "@/app/ui/sesiones/grid-sesiones"
import { Accordion, AccordionItem, Divider } from "@nextui-org/react"

export default function TimeLineSesiones({ lista }) {
    const [listaSemana, setListaSemana] = useState([])
    const [listaMes, setListaMes] = useState([])
    const [listaAno, setListaAno] = useState([])
    const [listaResto, setListaResto] = useState([])

    useEffect(() => {
        console.log(lista)

        const now = new Date()

        const inSemana = lista.filter(item => {
            const createdAt = new Date(item.created_at.seconds * 1000)
            const daysDiff = differenceInDays(now, createdAt)
            return daysDiff <= 7
        })

        const inMes = lista.filter(item => {
            const createdAt = new Date(item.created_at.seconds * 1000)
            const daysDiff = differenceInDays(now, createdAt)
            return daysDiff > 7 && differenceInMonths(now, createdAt) <= 1
        })

        const inAno = lista.filter(item => {
            const createdAt = new Date(item.created_at.seconds * 1000)
            const monthDiff = differenceInMonths(now, createdAt)
            return monthDiff > 1 && differenceInYears(now, createdAt) <= 1
        })

        const inResto = lista.filter(item => {
            const createdAt = new Date(item.created_at.seconds * 1000)
            return differenceInYears(now, createdAt) > 1
        })

        setListaSemana(inSemana)
        setListaMes(inMes)
        setListaAno(inAno)
        setListaResto(inResto)

    }, [lista])

    return (
        <>
            <Accordion /* defaultExpandedKeys={[1, 2, 3, 4]} */ selectionMode="multiple" variant="splitted">
                {(listaSemana && listaSemana.length > 0) &&
                    <AccordionItem key={1} aria-label="Hace una semana" title={
                        <><i className="ri-calendar-line me-2"></i>Hace una semana ({listaSemana.length})</>
                    }>
                        <div className="pb-5">
                            <GridSesiones lista={listaSemana} />
                        </div>
                    </AccordionItem>
                }
                {(listaMes && listaMes.length > 0) &&
                    <AccordionItem key={2} aria-label="Hace un mes" title={
                        <><i className="ri-calendar-line me-2"></i>Hace un mes ({listaMes.length})</>
                    }>
                        <div className="pb-5">
                            <GridSesiones lista={listaMes} />
                        </div>
                    </AccordionItem>
                }
                {(listaAno && listaAno.length > 0) &&
                    <AccordionItem key={3} aria-label="Hace un año" title={
                        <><i className="ri-calendar-line me-2"></i>Hace un año ({listaAno.length})</>
                    }>
                        <div className="pb-5">
                            <GridSesiones lista={listaAno} />
                        </div>
                    </AccordionItem>
                }
                {(listaResto && listaResto.length > 0) &&
                    <AccordionItem key={4} aria-label="Hace mucho tiempo" title={
                        <><i className="ri-calendar-line me-2"></i>Hace mucho tiempo ({listaResto.length})</>
                    }>
                        <div className="pb-5">
                            <GridSesiones lista={listaResto} />
                        </div>
                    </AccordionItem>
                }
            </Accordion>
            {/* {(listaSemana && listaSemana.length > 0) &&
                <div>
                    <div className="mb-3 px-5">
                        <p className="px-3">Esta semana</p>
                        <Divider />
                    </div>
                    <GridSesiones lista={listaSemana} />
                </div>
            } */}
        </>
    )
}