import { httpInstanceCreditos } from "../../../helpers/httpSINELI";
import { ValidacionErrores } from "../../../hooks";

/**************************************************************************
 * @description Método para obtener listado de entidades federativas.
 * @author Luis Angel Rocha Palacios
 * @version 2.0 26/06/2024
 * @params
 **************************************************************************/
export const ConsultarEntidadesFederativas = async (
  IdPais: number
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Catalogo/EntidadesFederativas/Pais/${IdPais}`
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener listado de ciudades por entidad federativa
 * @author Luis Angel Rocha Palacios
 * @version 2.0 26/06/2024
 * @params
 **************************************************************************/
export const ConsultarCiudades = async (
  IdEntidadFederativa: number
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Catalogo/Ciudades/EntidadFederativa/${IdEntidadFederativa}`
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener listado de colonias por ciudad
 * @author Luis Angel Rocha Palacios
 * @version 2.0 26/06/2024
 * @params
 **************************************************************************/
export const ConsultarColonias = async (IdCiudad: number): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(
      `/Catalogo/Colonias/Ciudad/${IdCiudad}`
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener catalogo de parentescos.
 * @author Luis Angel Rocha Palacios
 * @version 2.0 09/07/2024
 * @params
 **************************************************************************/
export const ConsultarCatalogoGenerales = async (
  data: any
): Promise<ICatalogo[]> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.post(
      `/Enrolamiento/GetOpcionesGenerales`,
      data
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener catalogo de generos.
 * @author Luis Angel Rocha Palacios
 * @version 2.0 02/10/2024
 * @params
 **************************************************************************/
export const ConsultarCatalogoGenerosSociales = async (): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(`/Catalogo/GenerosSociales`);
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};
