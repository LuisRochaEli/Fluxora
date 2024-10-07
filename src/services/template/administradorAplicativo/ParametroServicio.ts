import { httpInstanceCreditos } from "../../../helpers/httpSINELI";

/**************************************************************************
 * @description Método para obtener listado de parametros para la aplicacion
 * @author Luis Angel Rocha Palacios
 * @version 1.0 02/08/2024
 **************************************************************************/
export const ObtenerListadoParametrosAplicacion = async (
  IdAplicacion: number
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/AdministradorAplicativo/Parametro/IdAplicacion/${IdAplicacion}`
    );
  } catch (error) {
    throw error;
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener token de API desde la Tabla Maestra Filtros
 * @author Luis Angel Rocha Palacios
 * @version 1.0 06/08/2024
 **************************************************************************/
export const ObtenerTokenTablaMaestraFiltros = async (
  NombreAPI: string
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/AdministradorAplicativo/Parametro/TablaMaestra/Token/${NombreAPI}`
    );
  } catch (error) {
    throw error;
  }
  return Result.data;
};
