export type Cliente = {
  nombre: string;
  apellido: string;
  email: string;
};

export type Pago = {
  idCliente: string;
  idMP: string;
  recibido: number;
  comisiones: number;
  neto: number;
  fechaPago: string;
  payerMP: any;
};

export type Sesion = {
  idCliente: number;
  idPago: number;
  idPsicologo: number;
  sesion: string;
  link: string | null;
};

export type Psicologo = {
  id: number;
  nombre: string;
  apellido: string;
  emailPersonal: string;
  precioSesion: number;
  img: string;
  especialidad: string;
  descripcion: string;
  linkCV: string;
  linkedin: string;
  idCalendario: string;
};

export interface GoogleEvent {
  calendarId: string;
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

export type PaymentURL = {
  apellido: string;
  collection_id: string;
  collection_status: string;
  email: string;
  external_reference: string;
  merchant_account_id: string;
  merchant_order_id: string;
  monto: string;
  nombre: string;
  payment_id: string;
  payment_type: string;
  preference_id: string;
  processing_mode: string;
  psicologoId: string;
  site_id: string;
  status: string;
};
