interface IDtoFiltrosBandejaConfirmacionDatos {
  fechaAltaFrom: string | Date;
  fechaAltaTo: string | Date;
  enrolamientoCompleto: string | boolean;
}

interface IRegistroConfirmacionDatos {
  idOrigen: number;
  origen: string;
  identificador: number;
  nombre: string;
  apellidos: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idGenero: number | null;
  fechaNacimiento: Date;
  datosConfirmados: boolean;
  homonimosAtendidos: boolean;
  edad: string;
  documentosRelacionados: IDocumento[];
  documentosRelacionadosString: string;
}

interface IEnrolamientoOrigen {
  datosPersonales: IEnrolamientoDatosPersonales;
  documentosRelacionados: IDocumento[];
}

interface IEnrolamientoDatosPersonales {
  idOrigen: number;
  origen: string;
  identificador: number;
  nombre: string;
  apellidos: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idGenero: number | null;
  fechaNacimiento: Date;
  datosConfirmados: boolean;
  homonimosAtendidos: boolean;
  edad: string;
}

interface IDocumento {
  s3: string;
  url: string;
  descripcion: string;
  extension: string;
}

interface IFormikConfirmacionDatos {
  identificador: number | null;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idGenero: number | null;
  fechaNacimiento: string;
  edad: string;
  botonPrincipal: boolean;
}

interface IHomonimo {
  nombreCompleto: string;
  fechaNacimiento: Date;
  calle: string;
  colonia: string;
  codigoPostal: number;
  ciudad: string;
  nip: number;
  cuentas: string;
}
