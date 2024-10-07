interface IDtoFiltrosBandejaClientes {
  fechaInicio: string | Date;
  fechaFinal: string | Date;
}

interface IBandejaCliente {
  uuid: string;
  nombreCompleto: string;
  curp: string;
  celular: string;
  correo: string;
  id: number;
}

interface IPerfilCliente {
  datosPersonales: IClienteDatosPersonales;
  historialLaboral: IDetalleLaboral[];
  referenciasPersonales: [];
  imagenesCredencial: string[];
}

interface IClienteDatosPersonales {
  idDatosPersonales: number;
  nombreCompleto: string;
  nombreCompletoConcatenado: string;
  fechaNacimiento: string;
  sexo: string;
  direccionCompletaINE: string;
  domicilioPrincipal: string;
  idTipoDomicilio: number | null;
  idOcupacion: number | null;
  ingresoMensual: number | null;
  origenIngreso: string | null;
  correo: string;
  celular: string;
  celularConfirmadoSUMA: boolean | null;
  celularConfirmadoCondicionado: boolean | null;
  correoConfirmadoSUMA: boolean | null;
  correoConfirmadoCondicionado: boolean | null;
  resultadoGlobal: string;
  comprobanteIngresoS3: string | null;
  extensionComprobanteIngresoS3: string | null;
  comprobanteDomicilioS3: string | null;
  extensionComprobanteDomicilioS3: string | null;
  nombreEmpresa: string;
}

interface IDetalleLaboral {
  fechaAlta: string;
  fechaBaja: string;
  salarioBase: string;
  nombrePatron: string;
  checkVeriDoc: boolean;
  checkBuroCredito: boolean;
  checkCondicionadoA: boolean;
}

interface IReferenciaPersonal {
  idReferencia: number | string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idParentesco: string | null;
  telefono: string;
  viveConCliente: boolean;
  confirmacion: boolean;
  condicionadoA?: boolean;
}

interface IDocumentoS3 {
  base64: string | null;
  document: string | null;
  file: string | null;
  response: string;
  s3_id: string | null;
  status: number;
  tipoDoc: string | null;
}

interface IDtoDocumentoClienteBase64 {
  base64: string;
  guardarBD: boolean;
}

interface ICustomCapturePhoto {
  base64: string | null;
  format: string | null;
}

interface IMonitorEnrolamiento {
  uuid?: string;
  idEstatusGeneralEnrolamiento: number;
  idEstatusReferenciasPersonales?: number;
}

interface IInvestigacionBuroCredito {
  investigacionDatosPersonales: IDatosPersonalesBuroCredito;
  investigacionDomicilios: IDomicilioBuroCredito[];
  investigacionEmpleos: [];
  investigacionCuentas: ICuentaBuroCredito[];
  investigacionConsultasEfectuadas: IConsultaEfectuadaBuroCredito[];
  investigacionResumenReporte: IResumenReporteBuroCredito;
  investigacionHawkAlert: [];
}
interface IHawkAlert {
  fechaReporte: Date;
  codigoClave: string;
  mensaje: string;
  tipoInstitucion: string;
}

interface IDatosPersonalesBuroCredito {
  valorScore: number;
  tipoResidencia: string;
  nombreCompleto: string;
  fechaNacimiento: Date | null;
  sexo: string;
}

interface IDomicilioBuroCredito {
  direccionCompleta: string;
  tipoDomicilio: string;
  direccion: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  numeroTelefono: string;
  pais: string;
  fechaReporteDireccion: Date;
}

interface IEmpleoBuroCredito {
  direccionCompleta: string;
  nombreEmpresa: string
  numeroTelefono: string
  fechaUltimoDiaEmpleo: Date
  fechaReportoEmpleo: Date
  salario: number
}

interface IResumenReporteBuroCredito {
  numeroCuentas: number;
  numeroSolicitudesUltimos6Meses: number;
  cuentasPagosFijosHipotecas: number;
  cuentasRevolventesAbiertas: number;
  cuentasCerradas: number;
  cuentasNegativasActuales: number;
  existenciaDeclaracionesConsumidor: boolean;
  fechaAperturaCuentaMasAntigua: Date;
  fechaAperturaCuentaMasReciente: Date;
  fechaSolicitudReporteMasReciente: Date;
}

interface ICuentaBuroCredito {
  nombreOtorgante: string;
  numeroCuentaActual: string | null;
  tipoContrato: string;
  tipoCuenta: string;
  indicadorTipoResponsabilidad: string | null;
  claveUnidadMonetaria: string;
  fechaAperturaCuenta: Date;
  fechaUltimoPago: Date;
  fechaCierreCuenta: Date;
  limiteCredito: number;
  creditoMaximo: number;
  saldoActual: number;
  montoUltimoPago: number;
  montoPagar: number;
  historicoPagos: string;
  fechaActualizacion: Date
}

interface IConsultaEfectuadaBuroCredito {
  fechaConsulta: Date;
  nombreOtorgante: string;
  telefonoOtorgante: string | null;
  tipoContrato: string;
  indicadorTipoResponsabilidad: string | null;
  importeContrato: number;
  claveUnidadMonetaria: string | null;
}
