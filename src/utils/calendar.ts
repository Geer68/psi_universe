const { authenticate } = require("@google-cloud/local-auth");
import { google } from "googleapis";
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export interface Event {
  kind?: string;
  etag?: string;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  summary?: string;
  creator?: { email: string };
  organizer?: { email: string; displayName: string; self: boolean };
  start?: { dateTime: string; timeZone: string }; // inicio
  end?: { dateTime: string; timeZone: string }; // fin
  recurringEventId?: string;
  originalStartTime?: { dateTime: string; timeZone: string };
  iCalUID?: string;
  sequence?: number;
  hangoutLink?: string; // tiene meet?
  reminders?: { useDefault: boolean };
  eventType?: string;
  extendedProperties?: Object;
}

async function getAuth() {
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    undefined,
    process.env.CLIENT_SECRET,
    SCOPES
  );
  return client;
}

const id =
  "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com";

export async function setEventBooked(calendarId: string, eventId: string) {
  const auth = await getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.patch({
    calendarId,
    eventId,
    requestBody: {
      extendedProperties: {
        private: {
          booked: "true",
        },
      },
    },
  });
  return res.data;
}

export async function getEventByID(calendarId: string, eventId: string) {
  const auth = await getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.get({
    calendarId,
    eventId,
  });
  return res.data;
}

export async function getEvents(
  calendarId: string,
  maxResults: number = 40
): Promise<Array<Event> | null> {
  try {
    const auth = await getAuth();
    const calendar = google.calendar({ version: "v3", auth });
    console.log("Calendar", calendar);
    const res = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log("No upcoming events found.");
      return [];
    }
    return events as Array<Event>;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
  //   events.map((event: any, i: number) => {
  //     const start = event.start.dateTime || event.start.date;
  //     console.log(`${start} - ${event.summary}`);
  //   });
}
