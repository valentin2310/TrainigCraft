'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"

export default function Calendar({ list }) {
    const handleClick = (arg) => {
        alert(arg.dateStr)
    }

    const handleEventClick = (arg) => {
        console.log(arg)
        // alert(arg)
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            firstDay={1}
            dayHeaderFormat={{
                weekday: 'long'
            }}
            events={[
                { title: 'event 1', date: '2024-04-01' },
                { title: 'event 2', date: '2024-04-02' }
            ]}
            dateClick={handleClick}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
        />
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <span className="text-small font-bold text-blue-100">{eventInfo.timeText}</span>
            <i className="text-tiny">{eventInfo.event.title}</i>
        </>
    )
}