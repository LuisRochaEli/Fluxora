import { httpInstanceCreditos } from "../../../../helpers/httpSINELI";
import { ValidacionErrores } from "../../../../hooks";

/**************************************************************************
 * @description Método para obtener listado de enrolamientos pendientes para confirmar datos
 * @author Luis Angel Rocha Palacios
 * @version 2.0 02/10/2024
 * @params
 **************************************************************************/
export const ObtenerListadoEnrolamientoConfirmacionDatos = async (
  Filtros: any
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Enrolamiento/BandejaConfirmacionDatos`,
      {
        params: Filtros,
      }
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener listado de homonimos
 * @author Luis Angel Rocha Palacios
 * @version 2.0 03/10/2024
 * @params
 **************************************************************************/
export const ObtenerListadoHomonimos = async (Filtros: any): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Enrolamiento/CollectionHomonimos`,
      {
        params: Filtros,
      }
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para insertar o actualizar la relacion enrolamiento-origen asi mismo actualización de datos
 * @author Luis Angel Rocha Palacios
 * @version 2.0 04/10/2024
 * @params
 **************************************************************************/
export const InsertarActualizarRelacionEnrolamientoOrigen = async (
  data: any
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.post(
      `/Enrolamiento/RelacionEnrolamientoOrigen`,
      data
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener listado de homonimos
 * @author Luis Angel Rocha Palacios
 * @version 2.0 17/10/2024
 * @params
 **************************************************************************/
export const ObtenerItemEnrolamientoOrigen = async (
  data: any
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Enrolamiento/EnrolamientoOrigenItem`,
      {
        params: data,
      }
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};