import * as EnrolamientoServicio from "../../services/credito/EnrolamientoServicio";

export const useEnrolamiento = () => {
  const ObtenerListadoEnrolamientoConfirmacionDatos = async (Filtros: any) => {
    let respuesta: any;
    try {
      respuesta =
        await EnrolamientoServicio.ObtenerListadoEnrolamientoConfirmacionDatos(
          Filtros
        );
      return respuesta && respuesta.collection ? respuesta.collection : [];
    } catch (error) {
      return [];
    }
  };

  const ObtenerListadoHomonimos = async (Filtros: any) => {
    let respuesta: any;
    try {
      respuesta = await EnrolamientoServicio.ObtenerListadoHomonimos(Filtros);
      return respuesta && respuesta.collection ? respuesta.collection : [];
    } catch (error) {
      return [];
    }
  };

  const InsertarActualizarRelacionEnrolamientoOrigen = async (AjaxObj: any) => {
    let respuesta: any;
    try {
      respuesta =
        await EnrolamientoServicio.InsertarActualizarRelacionEnrolamientoOrigen(
          AjaxObj
        );
      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  return {
    ObtenerListadoEnrolamientoConfirmacionDatos,
    ObtenerListadoHomonimos,
    InsertarActualizarRelacionEnrolamientoOrigen,
  };
};
