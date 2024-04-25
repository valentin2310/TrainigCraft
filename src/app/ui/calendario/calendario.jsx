'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from "@fullcalendar/multimonth"
import esLocale from "@fullcalendar/core/locales/es"
import CalendarioModalAddRutina from "@/app/ui/calendario/modal-add-rutina";
import { useDisclosure, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CalendarioModalRutinaInfo from "@/app/ui/calendario/modal-rutina-info";
import { updateEvento } from "@/app/lib/data";

function renderEventContent(eventInfo) {
    return (
        <>
            <div className="p-1 bg-primary font-semibold">
                <span className="text-tiny">{eventInfo.event.title}</span>
            </div>
        </>
    )
}

export default function Calendar({ eventos, setEventos, rutinas, categorias, filteredRutinas, setFilteredRutinas, userId }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen: isOpenSee, onOpen: onOpenSee, onClose: onCloseSee, onOpenChange: onOpenChangeSee } = useDisclosure()

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedRutina, setSelectedRutina] = useState(null)
    const [selectedEvento, setSelectedEvento] = useState(null)

    const handleClick = (arg) => {
        /* alert(arg.dateStr) */
        setSelectedDate(arg.dateStr)
        onOpen()
    }

    const handleEventClick = (arg) => {
        // alert(arg.event)
        const ev = eventos.find((item) => item.id == arg.event.id)
        const rutina = rutinas.find((item) => item.id == ev.rutinaId)

        console.log(rutina)

        setSelectedRutina(rutina)
        setSelectedEvento(ev)
        onOpenSee()
    }

    const handleEdit = async (arg) => {
        /* Arreglar bug, sumarle un día */
        let fecha = new Date()
        fecha = fecha.setDate(new Date(arg.event.start).getDate() + 1)
        fecha = new Date(fecha)

        const newFecha = fecha.toISOString().split('T')[0]
        const ev = eventos.find((item) => item.id == arg.event.id)

        const isDuplicated = eventos.find((item) => item.rutinaId == ev.rutinaId && item.date == newFecha)

        if (isDuplicated) {
            arg.revert()
            return
        }

        await updateEvento(userId, ev, newFecha)

        /* Actualizar la lista de eventos */
        const newList = eventos
            .map((item) => {
                if (item.id == ev.id) item.date = newFecha
                return item
            })

        console.log(newList)
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={esLocale}
                firstDay={1}
                dayHeaderFormat={{
                    weekday: 'long'
                }}
                events={eventos}
                dateClick={handleClick}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                editable={true}
                eventDrop={handleEdit}
                headerToolbar={{
                    start: 'multiMonthYear dayGridMonth',
                    center: 'title',
                    end: 'today prev,next'
                }}
            />

            <CalendarioModalAddRutina
                isOpen={isOpen} onClose={onClose} onOpen={onOpen} onOpenChange={onOpenChange}
                userId={userId}
                rutinas={rutinas}
                categorias={categorias}
                filteredRutinas={filteredRutinas}
                setFilteredRutinas={setFilteredRutinas}
                eventos={eventos}
                setEventos={setEventos}
                selectedDate={selectedDate}
            />

            <CalendarioModalRutinaInfo
                isOpen={isOpenSee} onClose={onCloseSee} onOpen={onOpenSee} onOpenChange={onOpenChangeSee}
                userId={userId}
                rutina={selectedRutina}
                evento={selectedEvento}
                eventos={eventos}
                setEventos={setEventos}
            />
        </>
    )
}

