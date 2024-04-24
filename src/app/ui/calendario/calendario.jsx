'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"
import CalendarioModalAddRutina from "@/app/ui/calendario/modal-add-rutina";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CalendarioModalRutinaInfo from "@/app/ui/calendario/modal-rutina-info";

function renderEventContent(eventInfo) {
    return (
        <>
            <span className="text-small font-bold text-blue-100">{eventInfo.timeText}</span>
            <i className="text-tiny">{eventInfo.event.title}</i>
        </>
    )
}

export default function Calendar({ eventos, setEventos, rutinas, categorias, filteredRutinas, setFilteredRutinas, userId }) {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {isOpen : isOpenSee, onOpen : onOpenSee, onClose : onCloseSee, onOpenChange : onOpenChangeSee} = useDisclosure()
    
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedRutina, setSelectedRutina] = useState(null)
 
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
        setSelectedDate(ev.date)
        onOpenSee()
    }

    const handleEdit = (arg) => {
        console.log(arg.event.start)
        // alert(arg)
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
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
                rutina={selectedRutina}
                fecha={selectedDate}
            />
        </>
    )
}

