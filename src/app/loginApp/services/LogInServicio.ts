import { httpInstanceLogin } from "../../../helpers/httpSINELI";
import { ValidacionErrores } from "../../../hooks";

export const AccederUsuario = async (AjaxObj: any): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceLogin.post("", AjaxObj);
  } catch (error) {
    throw (Result = ValidacionErrores(error));
  }
  return Result.data;
};
