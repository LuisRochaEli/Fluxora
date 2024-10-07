import { httpInstanceDocumentos } from "../../../../helpers/httpSINELI";
import { ValidacionErrores } from "../../../../hooks";

/**************************************************************************
 * @description Método para subir documentos de cliente en Base64
 * @author Luis Angel Rocha Palacios
 * @version 1.0 01/07/2024
 * @params
 **************************************************************************/
export const SubirDocumentosClienteBase64 = async (
  data: IDtoDocumentoClienteBase64
): Promise<IDocumentoS3> => {
  let Result;
  try {
    Result = await httpInstanceDocumentos.post(
      `/documento/SubirDocumentosClienteBase64`,
      data
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener imagenes S3 en Base64
 * @author Luis Angel Rocha Palacios
 * @version 2.0 15/07/2024
 **************************************************************************/
export const ObtenerImagenBase64 = async (
  S3: string,
  Extension: string
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceDocumentos.get(
      `documento/getDocumentBase64/${S3}${Extension}`
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};

/**************************************************************************
 * @description Método para obtener Contrato del Cliente o del Enrolamiento
 * @author Luis Angel Rocha Palacios
 * @version 2.0 23/08/2024
 **************************************************************************/
export const ObtenerDocumentoContratoCliente = async (
  AjaxObj: any
): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceDocumentos.get(
      `/Reporte/Contrato/Cliente`, { params: AjaxObj }
    );
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};