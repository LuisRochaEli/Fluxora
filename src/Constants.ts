//#region CONFIGURACIÓN PRINCIPAL
export const DOMAINNAME = "elizondo.mx";
export const TOKEN_KEY = "SESSION_SINELI";
export const SERVER_ROUTE = "/APP/FLUXORA";
export const ID_APLICACION = Number(import.meta.env.VITE_ID_APLICACION);
export const APLICACION_MOVIL = false //Boolean(import.meta.env.VITE_APLICACION_MOVIL);
export const DEFAULT_LENGUAJE = "es";
export const AMBIENTES = {
  PRODUCCION: "AMBIENTE_PRODUCCION_ELIZONDO",
  QA: "AMBIENTE_QA_ELIZONDO",
};
export const ESTATUS_AUTENTICACION = {
  CHECKING: "CHECKING",
  AUTHENTICATED: "AUTHENTICATED",
  NOTAUTHENTICATED: "NOT_AUTHENTICATED",
};
//#endregion CONFIGURACIÓN PRINCIPAL

//#region API KEYS
export const PUBLIC_APIKEY_SUMA =
  "pk_test_VV/ylp2anwJ0qQrAKjRYt4KczrO+77LZEYbZ+hvO6fw=";
export const PRIVATE_APIKEY_SUMA =
  "sk_test_G5E09TZ6anygRyJaRxFNAtfnjQeK78pe86QD/fSuk2U=";
export const PUBLIC_APIKEY_SMS = "UmIy-Z1lK-M2FV-cTVE-MzNT-aTc3-Y0k0-QT09";
//#endregion API KEYS

//#region VERIDOC
export const ESTATUS_VERIDOC = {
  CHECKED: "Checked",
  WAITING_DATA: "WaitingData",
};

export const ORIGEN_DATA_VERIDOC = {
  MRZ: "MRZ",
  VISUAL: "VISUAL",
};

export const ATRIBUTO_DATO_VERIDOC = {
  CALLE: "Address Street",
  COLONIA: "Address Suburb",
  DIRECCION: "Address",
  FECHA_NACIMIENTO: "Date of Birth",
  APELLIDO_PATERNO: "Father Surname",
  APELLIDO_MATERNO: "Mother Surname",
  NOMBRES: "Given Names",
  SEXO: "Sex",
  EDAD: "Age",
};
//#endregion VERIDOC

//#region FORMATOS
export const FORMATO_FECHA = {
  DDMMYYYY: "dd/MM/yyyy",
  DDMMYYYYhhmm: "dd/MM/yyyy hh:mm aa",
  DDMMYYYYhhmmssAPI: "yyyy-MM-dd HH:mm:ss",
  MMYYYY: "MMM-yy",
};

export const FORMATO_MONEDA = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const MASCARA_TELEFONO = {
  NACIONAL: [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  INTERNACIONAL: [
    "+",
    /[0-9]/,
    /\d/,
    /\d/,
    /\d/,
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    "-",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

export const TOKEN_DATOS = {
  ENCRIPTAR: "ENCRIPTAR",
  DESENCRIPTAR: "DESENCRIPTAR",
};
//#endregion FORMATOS

//#region APLICACION ESPECIFICA
export const ESTATUSBANDEJA_VERIFICACIONDATOS = {
  VERIFICACION_INFORMACIONCAPTURADA: 1,
  VERIFICACION_HOMONIMOS: 2
}
export const INTERVALOENSEGUNDOS_CONSULTAESTATUS = 10;

export const CANALES_ENVIO_TELEFONO = {
  WHATSAPP: 0,
  SMS: 1,
};

export const RAZON_SOCIAL = "IMPULSORA ELIZONDO S.A. DE C.V.";

export const REPRESENTADO_POR = "LIC. AURELIO REYES AGUILAR";

export const DIAS_POR_MES = 30.4;

export const MEDIOS_REENVIOCONTRASENA = {
  CELULAR: {
    ID: 1,
    VALUE: "MedioContacto_Celular",
    CODIGO: "phone",
  },
  EMAIL: {
    ID: 2,
    VALUE: "MedioContacto_CorreoElectronico",
    CODIGO: "email",
  },
};

export const WHATSAPP_TELEFONOEMISOR = "5218115510000";

export const WHATSAPP_TEMPLATE = {
  REF_RECOMIENDA: "e013cd5f_0bf6_469b_af23_97937ce4ba76:btn_ref_recomienda",
};

export const CATALOGO_PAISES = {
  MEX: 151,
};

export const NOMBRES_API = {
  API_DOCS_V2: "TokenAPIDocsV2",
  API_ELIZONDO: "TokenAPIElizondo",
};

export const ESTATUS_ENROLAMIENTO = {
  INICIADO: {
    INE_CAPTURADO: 2,
  },
  PROCESO_CAPTURA: {
    DATOS_CONTACTO: 4,
    DATOS_ADICIONALES: 5,
    REFERENCIAS: 6,
    AUTORIZACIONES: 7,
  },
  EN_INVESTIGACION: {
    CAPTURA_FINALIZADA: 9,
  },
  COMPLETO: {
    INFORMACION_CAPTURADA: 21,
  },
};
//#endregion APLICACION ESPECIFICA

export const OPCIONESGENERALES_PADRE = {
  TIPO_DOMICILIO: "TYPE_ADDRESS",
  ANTIGUEDAD: "ANTIQUITY",
  ORIGEN_INGRESOS: "SOURCE_INCOME",
  OCUPACIONES: "OCCUPATIONS",
  PARENTESCOS: "RELATIVES",
};

export const PARAMETROS = {
  SEGUNDOS_ESPERA_VERIDOC: "SEGUNDOS_ESPERA_VERIDOC",
  TOKEN_VERIDOC: "TOKEN_VERIDOC",
  MEDIO_VERIFICACION_REFERENCIAS: "MEDIO_VERIFICACION_REFERENCIAS",
  SDK_VERIDOC_SELFIE: "SDK_VERIDOC_SELFIE",
  MINIMO_RANGO_LINEACREDITO: "MINIMO_RANGO_LINEACREDITO",
  MAXIMO_RANGO_LINEACREDITO: "MAXIMO_RANGO_LINEACREDITO",
  STEP_RANGO_LINEACREDITO: "STEP_RANGO_LINEACREDITO",
  TELEFONO_MENSAJE_QA: "TELEFONO_MENSAJE_QA",
  MENSAJE_REFERENCIA_SMS: "MENSAJE_REFERENCIA_SMS",
  CANTIDAD_REFERENCIAS: "CANTIDAD_REFERENCIAS",
  CANTIDAD_REFERENCIAS_NOVIVECONCLIENTE:
    "CANTIDAD_REFERENCIAS_NOVIVECONCLIENTE",
  CANTIDAD_REFERENCIAS_VIVECONCLIENTE: "CANTIDAD_REFERENCIAS_VIVECONCLIENTE",
  TIEMPOSEGUNDOS_ENTREREENVIO: "TIEMPOSEGUNDOS_ENTREREENVIO",
  TIEMPOMINUTOS_VIGENCIACODIGO: "TIEMPOMINUTOS_VIGENCIACODIGO",
  NUMEROMAXIMOINTENTOS_REENVIO: "NUMEROMAXIMOINTENTOS_REENVIO",
};

export const ORIGEN_INGRESOS = {
  EMPLEADO: 14,
};

export const ORIGEN_DOCUMENTOCONTRATO = "AppCredito"

export const ORIGEN_INVESTIGACIONBUROCREDITO = {
  APLICACION_ENROLAMIENTO: 1,
  SINELI_CLIENTES: 2,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503
};

export const HTTP_INSTANCE = {
  LOGIN: `https://www.elizondo.mx:5050/<%Ambiente%>/basics/usuario/login/`,
  BASICS: `https://www.elizondo.mx:5050/<%Ambiente%>/basics`,
  DOCUMENTOS: `https://www.elizondo.mx:5050/<%Ambiente%>/documentos`,
  CREDITOS: `https://www.elizondo.mx:5050/<%Ambiente%>/AppCredito`
}