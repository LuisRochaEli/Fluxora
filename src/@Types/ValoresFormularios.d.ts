interface IValoresCreditoDatosContacto {
    idDomicilio: number | null
    viveDireccionINE: boolean
    calle: string
    idEstado: number | null
    idCiudad: number | null
    idColonia: number | null
    nombreColonia: string
    codigoPostal: string
    entreCalles: string
    coordLat: number | null
    coordLong: number | null
    celular: string
    correo: string
}

interface IValoresCreditoAutorizaciones {
    medioReenvioContrasena: string 
    autorizacionBuroCredito: boolean
    codigoValidacion: string
}

interface IValoresCreditoDatosAdicionales {
  idTipoDomicilio: number | null;
  idAntiguedadDomicilio: number | null;
  nombreEmpresa: string | null;
  // tieneTarjetaCredito: boolean
  // tieneCreditoAutomotriz: boolean
  // tieneCreditoHipotecario: boolean
  idOcupacion: number | null;
  ingresoMensual: string;
  idAntiguedadLaboral: number | null;
  monto: number;
  origenIngresos: (string | number)[] | [] | null;
}