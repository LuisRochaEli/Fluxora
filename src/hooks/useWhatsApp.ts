import { WHATSAPP_TELEFONOEMISOR } from "../Constants";
import * as WhatsAppServicio from "../services/template/WhatsAppServicio";

export const useWhatsApp = () => {
  const EnvioTemplateWhatsApp = async (
    TelefonoDestino: string,
    TemplateId: string,
    NombreCliente: string,
    TransactionMetadata: any = null
  ) => {
    let respuesta;
    try {
      const AjaxObj = {
        channel: WHATSAPP_TELEFONOEMISOR,
        customerDestinationUserId: "",
        customerTransactionId: "",
        destination: TelefonoDestino,
        template: {
          templateId: TemplateId,
          language: "es_MX",
          vars: [NombreCliente],
          url: "",
          mime: "",
        },
        description: "",
        blackListIds: [],
        transactionMetadata: TransactionMetadata,
      };
      respuesta = await WhatsAppServicio.EnvioTemplateWhatsApp(AjaxObj);
    } catch (error) {
      throw (respuesta = error);
    }
    return respuesta;
  };

  const EnvioTemplateSMS = async (TelefonoDestino: string, Mensaje: string) => {
    let respuesta;
    try {
      respuesta = await WhatsAppServicio.EnvioTemplateSMS(
        TelefonoDestino,
        Mensaje
      );
    } catch (error) {
      throw (respuesta = error);
    }
    return respuesta;
  };

  const EnvioTemplateSMSElizondo = async (
    TelefonoDestino: string,
    Mensaje: string
  ) => {
    let respuesta;
    try {
      const AjaxObj = {
        phone: TelefonoDestino,
        content: Mensaje,
      };
      respuesta = await WhatsAppServicio.EnvioTemplateSMSElizondo(AjaxObj);
    } catch (error) {
      throw (respuesta = error);
    }
    return respuesta;
  };

  return { EnvioTemplateWhatsApp, EnvioTemplateSMS, EnvioTemplateSMSElizondo };
};
