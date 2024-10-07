import { PUBLIC_APIKEY_SMS } from "../../Constants";
import { httpInstanceCreditos, httpInstanceSMS, httpInstanceSysWebApp } from "../../helpers/httpSINELI";

/**************************************************************************
 * @description Método para enviar template de mensaje por WhatsApp
 * @author Luis Angel Rocha Palacios
 * @version 1.0 08/07/2024
 **************************************************************************/
export const EnvioTemplateWhatsApp = async (data: any): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceCreditos.post(
      "/Enrolamiento/Envio/TemplateWhatsApp",
      data
    );
  } catch (error) {
    throw error;
  }
  return Result;
};


/**************************************************************************
 * @description Método para enviar template de mensaje por SMS
 * @author Luis Angel Rocha Palacios
 * @version 1.0 08/07/2024
 **************************************************************************/
export const EnvioTemplateSMS = async (Telefono: string, Mensaje: string): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceSMS.get(
      `/send?auth=${PUBLIC_APIKEY_SMS}&phone=${Telefono}&msg=${Mensaje}`);
  } catch (error) {
    throw error;
  }
  return Result;
};

/**************************************************************************
 * @description Método para enviar template de mensaje por SMS (Elizondo)
 * @author Luis Angel Rocha Palacios
 * @version 1.0 08/07/2024
 **************************************************************************/
export const EnvioTemplateSMSElizondo = async (data: any): Promise<any> => {
  let Result;
  try {
    Result = await httpInstanceSysWebApp.post(
      `/sendSMS`, data);
  } catch (error) {
    throw error;
  }
  return Result;
};