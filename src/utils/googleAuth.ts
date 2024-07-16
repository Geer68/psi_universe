import { google } from "googleapis";
import { GoogleEvent } from "./types";
// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/spreadsheets",
];

export async function getAuth() {
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    undefined,
    process.env.CLIENT_SECRET,
    SCOPES
  );
  return client;
}
