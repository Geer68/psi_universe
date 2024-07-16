export function extractDateTime(fechaString: string) {
  if (!fechaString) {
    return { date: "", time: "" };
  } else {
    const date = new Date(fechaString);
    const datePart = date.toLocaleDateString("es-ES");
    // Replace datePart / with .
    const datePartReplaced = datePart.replace(/\//g, ".");
    const timePart = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { date: datePartReplaced, time: timePart };
  }
}
