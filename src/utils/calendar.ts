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
  recurringEventId?: string;
  originalStartTime?: { dateTime: string; timeZone: string };
  iCalUID?: string;
  sequence?: number;
  hangoutLink?: string; // tiene meet?
  reminders?: { useDefault: boolean };
  eventType?: string;
  extendedProperties?: { private: { booked: boolean | string } };
  backgroundColor: string;
  start: string;
  end: string;
  booked?: boolean;
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

    const res = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    const fetchedEvents = res.data.items;

    const events = fetchedEvents?.map((event) => {
      let startTime = event.start?.dateTime;
      let endTime = event.end?.dateTime;

      let backgroundColor = "#7643BE";
      let borderColor = "#e8e7e6";

      if (event.extendedProperties?.private?.booked) {
        backgroundColor = "#D3D3D3";
      }

      return {
        ...event,
        start: startTime,
        end: endTime,
        backgroundColor,
        borderColor,
      };
    });

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
