import { httpInstanceBridget } from "../../helpers/httpSINELI";
import { ValidacionErrores } from "../../hooks/template/useValidacionErrorServer";

/**************************************************************************
 * @description Método para validar las impresoras instaladas en el sistema
 * @author Marcos Piña
 * @version 2.0 28/08/2023
 * @params Id del número de usuario.
 **************************************************************************/
export const ValidarImpresoras = async (usuario: number): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceBridget.post(
      "Impresion/ValidaImpresoras",
      JSON.stringify({ usuario })
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result;
};
