import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import dayGrid from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import ModalMercadoPago from "../ModalMercadoPago";
import { GoogleEvent, Psicologo } from "@/utils/types";

export default function Calendar({
  events,
  psicologo,
}: {
  events: Array<Object>;
  psicologo: Psicologo;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [eventoElegido, setEventoElegido] = useState<GoogleEvent | null>(null);

  return (
    <>
      <ModalMercadoPago
        open={openModal}
        setOpen={setOpenModal}
        psicologo={psicologo}
        eventoElegido={eventoElegido}
      />
      <FullCalendar
        locale="es"
        weekends={false}
        plugins={[timeGridPlugin, dayGrid]}
        events={events}
        progressiveEventRendering={true}
        eventContent={renderEventContent}
        eventClick={(eventInfo) => {
          const eventClicked = eventInfo.event.extendedProps;
          const isBooked = eventClicked.extendedProperties?.private.booked;
          if (
            isBooked == "true" ||
            eventInfo.event.start == null ||
            eventInfo.event.end == null
          ) {
            return;
          }
          setOpenModal(true);
          setEventoElegido({
            ...eventClicked,
            start: eventInfo.event.start.toLocaleString(),
            end: eventInfo.event.end.toLocaleString(),
            booked: eventClicked.extendedProperties?.private.booked || null,
            backgroundColor: eventClicked.backgroundColor || "",
          } as GoogleEvent);
        }}
        height="auto"
        initialView="timeGridWeek"
        allDaySlot={false}
        slotMinTime={"07:00:00"}
        slotMaxTime={"24:00:00"}
      />
    </>
  );
}

function renderEventContent(eventInfo: { event: any }) {
  const startTime = new Date(eventInfo.event.start);
  const endTime = new Date(eventInfo.event.end);

  const eventProps = eventInfo.event.extendedProps;

  const startString = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endString = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const isBooked = eventProps.extendedProperties?.private.booked;
  if (isBooked == "true") {
    return (
      <div className="w-full h-full cursor-not-allowed">
        <b className="text-gray-800">
          {startString} - {endString} Sesión ocupada
        </b>
      </div>
    );
  }
  return (
    <div className="w-full h-full cursor-pointer">
      <b className="w-full">
        {startString} - {endString} Sesión libre
      </b>
    </div>
  );
}
