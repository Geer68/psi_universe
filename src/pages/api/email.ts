import { EVENTS_STATE_ENUM, listEvents } from "@/utils/calendar";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  body: string;
  title: string;
}

// {
//   kind: 'calendar#event',
//   etag: '"3438538322704000"',
//   id: '4c5qm4b9v158qkrvhu61t9vp1m_20240912T153000Z',
//   status: 'confirmed',
//   htmlLink: 'https://www.google.com/calendar/event?eid=NGM1cW00Yjl2MTU4cWtydmh1NjF0OXZwMW1fMjAyNDA5MTJUMTUzMDAwWiA5MzAxNzE3OWE5ZmNkYzBmYTZjOTNiZTI5YzZjNjNlNGVmMDBhNTkxYjk1MzVkMGZjMDk2MjlkZTAwMTk0YjljQGc',
//   created: '2024-05-15T18:54:38.000Z',
//   updated: '2024-06-24T22:46:01.352Z',
//   summary: 'Turno-JUEVES12:30',
//   creator: { email: 'gaabgames@gmail.com' },
//   organizer: {
//     email: '93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com',
//     displayName: 'Turnos',
//     self: true
//   },
//   start: {
//     dateTime: '2024-09-12T12:30:00-03:00',
//     timeZone: 'America/Argentina/Mendoza'
//   },
//   end: {
//     dateTime: '2024-09-12T13:30:00-03:00',
//     timeZone: 'America/Argentina/Mendoza'
//   },
//   recurringEventId: '4c5qm4b9v158qkrvhu61t9vp1m',
//   originalStartTime: {
//     dateTime: '2024-09-12T12:30:00-03:00',
//     timeZone: 'America/Argentina/Mendoza'
//   },
//   iCalUID: '4c5qm4b9v158qkrvhu61t9vp1m@google.com',
//   sequence: 0,
//   reminders: { useDefault: true },
//   eventType: 'default'
// },

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  //   const body = await req.body.json().then((data: Request) => data);
  //   console.log("body", body);
  const events = await listEvents(
    "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com"
  );
  if (
    events === EVENTS_STATE_ENUM.error ||
    events === EVENTS_STATE_ENUM.empty
  ) {
    res.send({ success: false });
  }
  console.log(events);
  res.send({ success: true });
}
