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
  psicologo: string;
  site_id: string;
  status: string;
};
