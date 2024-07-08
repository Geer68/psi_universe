import { Event } from "@/utils/calendar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { useState } from "react";
import ModalMercadoPago from "../ModalMercadoPago";

export default function Calendar({
  events,
  psicologoId,
}: {
  events: Array<Object>;
  psicologoId: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ModalMercadoPago
        open={openModal}
        setOpen={setOpenModal}
        psicologoId={psicologoId}
      />
      <FullCalendar
        locale="es"
        weekends={false}
        plugins={[timeGridPlugin]}
        events={events}
        eventContent={renderEventContent}
        eventClick={(eventInfo) => {
          const eventClicked = eventInfo.event.extendedProps;
          const isBooked = eventClicked.extendedProperties?.private.booked;
          console.log(eventClicked);
          if (isBooked == "true") {
            return;
          } else {
            console.log("Evento clickeado esta disponible");
          }
          setOpenModal(true);
        }}
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
          {startString} - {endString} Turno ocupado
        </b>
      </div>
    );
  }
  return (
    <div className="w-full h-full cursor-pointer">
      <b className="w-full">
        {startString} - {endString} Turno desocupado
      </b>
    </div>
  );
}
