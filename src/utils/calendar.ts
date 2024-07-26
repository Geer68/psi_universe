const { authenticate } = require("@google-cloud/local-auth");
import { google } from "googleapis";
import { getAuth } from "./googleAuth";
import { GoogleEvent } from "./types";

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
): Promise<Array<GoogleEvent> | null> {
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

    const events = fetchedEvents
      ?.map((event) => {
        let startTime = event.start?.dateTime;
        let endTime = event.end?.dateTime;

        let backgroundColor = "#7643BE";
        let borderColor = "#e8e7e6";

        if (event.extendedProperties?.private?.booked) {
          backgroundColor = "#D3D3D3";
        }

        return {
          ...event,
          calendarId,
          start: startTime,
          end: endTime,
          backgroundColor,
          borderColor,
        };
      })
      .filter((event) => event.hangoutLink) as Array<GoogleEvent>;

    if (!events || events.length === 0) {
      console.log("No upcoming events found.");
      return [];
    }
    return events as Array<GoogleEvent>;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

export async function checkEvent(calendarId: string, id: string) {
  const auth = await getAuth();
  const events = await getEvents(calendarId);
  const bookedEvent = events?.find(
    (event) =>
      event.id === id && event.extendedProperties?.private?.booked === "true"
  );
  if (bookedEvent) {
    return true;
  }
}
