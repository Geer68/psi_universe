import { Event } from "@/utils/calendar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { useEffect, useState } from "react";
import ModalMercadoPago from "../ModalMercadoPago";
import { Psicologo } from "@/utils/types";

export default function Calendar({
  events,
  psicologo,
}: {
  events: Array<Object>;
  psicologo: Psicologo;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [eventoElegido, setEventoElegido] = useState<Event | null>(null);

  useEffect(() => {
    console.log(eventoElegido);
  }, [eventoElegido]);

  return (
    <>
      <ModalMercadoPago
        open={openModal}
        setOpen={setOpenModal}
        psicologo={psicologo}
        eventoElegido={eventoElegido as Event}
      />
      <FullCalendar
        locale="es"
        weekends={false}
        plugins={[timeGridPlugin]}
        events={events}
        eventContent={renderEventContent}
        eventClick={(eventInfo) => {
          console.log(eventInfo);
          const eventClicked = eventInfo.event.extendedProps;
          const isBooked = eventClicked.extendedProperties?.private.booked;
          console.log(eventClicked);
          if (isBooked == "true") {
            return;
          } else {
            console.log("Evento clickeado esta disponible");
          }
          setOpenModal(true);
          setEventoElegido(eventClicked as Event);
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
        <b>
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
