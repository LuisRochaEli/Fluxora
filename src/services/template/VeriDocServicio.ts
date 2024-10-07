import {
  httpInstanceVeriDoc,
  httpInstanceVeriDocV3,
} from "../../helpers/httpSINELI";
import { ValidacionErrores } from "../../hooks/template/useValidacionErrorServer";
import * as EnrolamientoServicio from "../../app/sineliApp/services/credito/EnrolamientoServicio";

/**************************************************************************
 * @description Método para crear una nueva verificación.
 * @author Luis Angel Rocha Palacios
 * @version 1.0 17/06/2023
 **************************************************************************/
export const VerificarDocumento = async (data: any): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceVeriDoc.post("/id/v2/verify", data);
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result;
};

/**************************************************************************
 * @description Método para crear una nueva verificación.
 * @author Luis Angel Rocha Palacios
 * @version 1.0 17/06/2023
 **************************************************************************/
export const CrearVerificacion = async (data: any): Promise<any> => {
  let Result;
  let Bitacora;
  const FechaConsulta = new Date();
  try {
    Result = await httpInstanceVeriDocV3.post(
      "/id/v3/createVerification",
      data
    );
    Bitacora = {
      UUID: Result ? (Result.data ? Result.data : null) : null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Crear Verificacion",
      URI: Result
        ? Result.request
          ? Result.request.responseURL
            ? Result.request.responseURL
            : null
          : null
        : null,
      JsonBody: JSON.stringify(data),
      CodigoRespuesta: Result ? (Result.status ? Result.status : null) : null,
      EstatusRespuesta: Result
        ? Result.statusText
          ? Result.statusText.toUpperCase()
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
  } catch (error: any) {
    Bitacora = {
      UUID: null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Crear Verificacion",
      URI: error
        ? error.response
          ? error.response.request
            ? error.response.request.responseURL
              ? error.response.request.responseURL
              : null
            : null
          : null
        : null,
      JsonBody: JSON.stringify(data),
      CodigoRespuesta: error
        ? error.response
          ? error.response.status
            ? error.response.status
            : null
          : null
        : null,
      EstatusRespuesta: error
        ? error.response
          ? error.response.statusText
            ? error.response.statusText.toUpperCase()
            : null
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para comprobar estado de verificacion
 * @author Luis Angel Rocha Palacios
 * @version 1.0 19/06/2023
 **************************************************************************/
export const ObtenerEstatusVerificacion = async (data: any): Promise<any> => {
  let Result;
  let Bitacora;
  const FechaConsulta = new Date();
  try {
    Result = await httpInstanceVeriDoc.post("/id/v3/status", data);
    Bitacora = {
      UUID: data ? (data.uuid ? data.uuid : null) : null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Obtener Estatus Verificación",
      URI: Result
        ? Result.request
          ? Result.request.responseURL
            ? Result.request.responseURL
            : null
          : null
        : null,
      JsonBody: JSON.stringify(data),
      CodigoRespuesta: Result ? (Result.status ? Result.status : null) : null,
      EstatusRespuesta: Result
        ? Result.statusText
          ? Result.statusText.toUpperCase()
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
  } catch (error: any) {
    Bitacora = {
      UUID: data ? (data.uuid ? data.uuid : null) : null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Obtener Estatus Verificación",
      URI: error
        ? error.response
          ? error.response.request
            ? error.response.request.responseURL
              ? error.response.request.responseURL
              : null
            : null
          : null
        : null,
      JsonBody: JSON.stringify(data),
      CodigoRespuesta: error
        ? error.response
          ? error.response.status
            ? error.response.status
            : null
          : null
        : null,
      EstatusRespuesta: error
        ? error.response
          ? error.response.statusText
            ? error.response.statusText.toUpperCase()
            : null
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para comprobar los resultados de la verificación.
 * @author Luis Angel Rocha Palacios
 * @version 1.0 20/06/2023
 **************************************************************************/
export const ObtenerResultadosVerificacion = async (
  data: any
): Promise<any> => {
  let Result;
  let Bitacora;
  const FechaConsulta = new Date();
  try {
    Result = await httpInstanceVeriDoc.post("/id/v3/results", data);
    Bitacora = {
      UUID: data ? (data.uuid ? data.uuid : null) : null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Obtener Resultados Verificación",
      URI: Result
        ? Result.request
          ? Result.request.responseURL
            ? Result.request.responseURL
            : null
          : null
        : null,
      JsonBody: JSON.stringify(data),
      CodigoRespuesta: Result ? (Result.status ? Result.status : null) : null,
      EstatusRespuesta: Result
        ? Result.statusText
          ? Result.statusText
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
  } catch (error: any) {
    Bitacora = {
      UUID: null,
      FechaConsulta: FechaConsulta,
      FechaConsultaFin: new Date(),
      TituloEP: "Obtener Estatus Verificación",
      URI: error
        ? error.response
          ? error.response.request
            ? error.response.request.responseURL
              ? error.response.request.responseURL
              : null
            : null
          : null
        : null,
      JsonBody: data,
      CodigoRespuesta: error
        ? error.response
          ? error.response.status
            ? error.response.status
            : null
          : null
        : null,
      EstatusRespuesta: error
        ? error.response
          ? error.response.statusText
            ? error.response.statusText.toUpperCase()
            : null
          : null
        : null,
    };
    await EnrolamientoServicio.GuardarBitacoraVeriDoc(Bitacora);
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};
