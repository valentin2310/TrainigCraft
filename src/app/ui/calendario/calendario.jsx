'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"
import CalendarioModalAddRutina from "@/app/ui/calendario/modal-add-rutina";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { updateEventos } from "@/app/lib/data";

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
    const [selectedDate, setSelectedDate] = useState(null)
 
    const handleClick = (arg) => {
        /* alert(arg.dateStr) */
        setSelectedDate(arg.dateStr)
        onOpen()
    }

    const handleEventClick = (arg) => {
        console.log(arg.event)
        // alert(arg)
    }

    const handleEdit = (arg) => {
        console.log(arg.event.start)
        // alert(arg)
    }

    const updateEv = async () => {
        await updateEventos(userId, eventos);
        console.log('eventos actualizados', eventos)
    }

    useEffect(() => {
        if (!userId) return
        if (!eventos) return

        /* Guardar eventos */
        /* updateEv() */
        console.log(eventos)

    }, [eventos])

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
        </>
    )
}

