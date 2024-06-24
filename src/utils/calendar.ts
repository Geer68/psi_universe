const { authenticate } = require("@google-cloud/local-auth");
import { google } from "googleapis";
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export enum EVENTS_STATE_ENUM {
  success,
  empty,
  error,
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

export async function listEvents(
  calendarId: string
): Promise<EVENTS_STATE_ENUM | Array<Object>> {
  try {
    const auth = await getAuth();
    const calendar = google.calendar({ version: "v3", auth });
    console.log("Calendar", calendar);
    const res = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 40,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log("No upcoming events found.");
      return EVENTS_STATE_ENUM.empty;
    }
    return events;
  } catch (e) {
    console.error("Error: ", e);
    return EVENTS_STATE_ENUM.error;
  }
  //   events.map((event: any, i: number) => {
  //     const start = event.start.dateTime || event.start.date;
  //     console.log(`${start} - ${event.summary}`);
  //   });
}
