import { httpInstanceCreditos } from "../../../helpers/httpSINELI";

/**************************************************************************
 * @description Método para encriptar o desencriptar Token
 * @author Luis Angel Rocha Palacios
 * @version 1.0 23/10/2024
 **************************************************************************/
export const EncriptarDesencriptarToken = async (data: {
  texto: string;
  tipo: string;
}): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.get(`/Token/EncriptarDesencriptar`, {
      params: data,
    });
  } catch (error) {
    throw error;
  }
  return Result.data;
};
