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
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";

function renderEventContent(eventInfo) {
    let fecha = new Date(eventInfo.event.start)
    fecha = fecha.setDate(fecha.getDate() + 1)
    const hoy = (new Date).setHours(0, 0, 0)

    return (
        <>
            <div className={clsx(
                "p-1 font-semibold",
                { 'bg-blue-500' : !eventInfo.event.extendedProps.isCompletado && fecha >= hoy },
                { 'bg-red-500' : !eventInfo.event.extendedProps.isCompletado && fecha < hoy },
                { 'bg-primary' : eventInfo.event.extendedProps.isCompletado },
            )}>
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
        if (arg.dateStr < (new Date()).toISOString().split('T')[0]) {
            toast.error("Debes elegir una fecha mayor a la actual.")
            return
        }
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

        /* Si es un evento anterior al actual no hacer nada */
        if (fecha < new Date() || arg.event.extendedProps.isCompletado) {
            arg.revert()
            return;
        }

        const newFecha = fecha.toISOString().split('T')[0]
        const ev = eventos.find((item) => item.id == arg.event.id)

        const isDuplicated = eventos.find((item) => item.rutinaId == ev.rutinaId && item.date == newFecha)

        /* Si el evento esta duplicado o la nueva fecha es anterior a la actual no hacer nada */
        if (isDuplicated || newFecha < new Date()) {
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
            <ToastContainer />
        </>
    )
}

