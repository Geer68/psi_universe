export function extractDateTime(fechaString: string, conBarra?: boolean) {
  if (!fechaString) {
    return { date: "", time: "" };
  } else {
    const date = new Date(fechaString);
    const datePart = date.toLocaleDateString("es-ES");
    // Replace datePart / with .
    let datePartReplaced = datePart.replace(/\//g, ".");
    if (conBarra) {
      datePartReplaced = datePartReplaced.replace(/\./g, "/");
    }
    const timePart = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { date: datePartReplaced, time: timePart };
  }
}

// Función para agregar ceros a la izquierda en los milisegundos y segundos
function padZeros(number: number, length: number): string {
  return number.toString().padStart(length, "0");
}

// Función para convertir a la hora de Argentina y formatear la fecha
export function formatToArgentinianTime(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Ajustar a la hora de Argentina (UTC-3)
  const offsetMs = -3 * 60 * 60 * 1000;
  const argDate = new Date(date.getTime() + offsetMs);

  const year = argDate.getUTCFullYear();
  const month = padZeros(argDate.getUTCMonth() + 1, 2);
  const day = padZeros(argDate.getUTCDate(), 2);
  const hours = padZeros(argDate.getUTCHours(), 2);
  const minutes = padZeros(argDate.getUTCMinutes(), 2);
  const seconds = padZeros(argDate.getUTCSeconds(), 2);
  const milliseconds = padZeros(argDate.getUTCMilliseconds(), 6);

  // Formato final
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;

  return formattedDate;
}
