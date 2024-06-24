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
  sesion: number;
  linkSesion: string | null;
};
