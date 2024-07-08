import { Event } from "@/utils/calendar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { useState } from "react";
import ModalMercadoPago from "../ModalMercadoPago";

export default function Calendar({ events }: { events: Array<Object> }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ModalMercadoPago open={openModal} setOpen={setOpenModal} />
      <FullCalendar
        locale="es"
        weekends={false}
        plugins={[timeGridPlugin]}
        events={events}
        eventContent={renderEventContent}
        eventClick={(info) => {
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

function renderEventContent(eventInfo: { event: Event }) {
  if (eventInfo.event.booked && eventInfo.event.booked === true) {
    return (
      <>
        <b>Turno ocupado</b>
      </>
    );
  }
  return (
    <>
      <b className="w-full bg-slate-500">Turno desocupado</b>
    </>
  );
}
