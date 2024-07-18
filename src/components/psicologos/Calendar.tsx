import { useBreakpoint } from "@/hooks/useBreakpoint";
import { GoogleEvent, Psicologo } from "@/utils/types";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { useEffect, useState } from "react";
import ModalMercadoPago from "../ModalMercadoPago";

export default function Calendar({
  events,
  psicologo,
}: {
  events: Array<GoogleEvent>;
  psicologo: Psicologo;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [eventoElegido, setEventoElegido] = useState<GoogleEvent | null>(null);
  const matches = useBreakpoint("sm-");

  // useEffect(() => console.log(matches), [matches]);

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
            id: eventInfo.event.id,
            summary: eventInfo.event.title,
            start: eventInfo.event.start.toISOString(),
            end: eventInfo.event.end.toISOString(),
            booked: eventClicked.extendedProperties?.private.booked || null,
            backgroundColor: eventInfo.event.backgroundColor || "",
            htmlLink: eventClicked.htmlLink,
            creator: eventClicked.creator,
            organizer: eventClicked.organizer,
            calendarId: eventClicked.calendarId,
          } as GoogleEvent);
        }}
        height="auto"
        initialView={
          window.matchMedia("(max-width: 640px)").matches
            ? "timeGridDay"
            : "timeGridWeek"
        }
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
