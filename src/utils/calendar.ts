const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
 * Load or request or authorization to call APIs.
 *
 */
async function getAuth() {
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.CLIENT_SECRET,
    SCOPES
  );
  return client;
}

export async function listEvents() {
  const auth = await getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId:
      "93017179a9fcdc0fa6c93be29c6c63e4ef00a591b9535d0fc09629de00194b9c@group.calendar.google.com",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event: any, i: number) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}
