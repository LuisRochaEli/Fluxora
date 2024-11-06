import {
  httpInstanceBasics,
  httpInstanceCreditos,
  httpInstanceDocumentos,
  httpInstanceLogin,
  httpInstanceSysWebApp,
  httpInstanceVeriDoc,
} from "./httpSINELI";
import { useAmbienteStore } from "../store/template/useAmbienteStore";
import { DesencriptarValores } from "./Crypto";
import { AMBIENTES, HTTP_INSTANCE } from "../Constants";

export const setAuthorizationVeriDocHeader = (token: string) =>
  (httpInstanceVeriDoc.defaults.headers.common["Authorization"] =
    `Bearer ${token}`);

export const removeAuthorizationVeriDocHeader = () =>
  delete httpInstanceVeriDoc.defaults.headers.common["Authorization"];

export const setAuthorizationApiCreditos = (token: string) => {
  httpInstanceCreditos.defaults.headers.common.Authorization = token;
  httpInstanceDocumentos.defaults.headers.common.Authorization = token;
};

export const removeAuthorizationApiCreditos = () =>
  delete httpInstanceCreditos.defaults.headers.common["Authorization"];

export const setAuthorizationApiSysWebApp = (token: string) => {
  httpInstanceSysWebApp.defaults.headers.common.Authorization = token;
};

export const removeAuthorizationApiSysWebApp = () =>
  delete httpInstanceSysWebApp.defaults.headers.common["Authorization"];

export const CambioRutasAPI = () => {
  const { Ambiente } = useAmbienteStore();
  //api-sineli
  //syswebapp
  const CambiosRuta = () => {
    const AmbienteTexto = DesencriptarValores(Ambiente);
    if (AmbienteTexto === AMBIENTES.PRODUCCION) {
      httpInstanceLogin.defaults.baseURL = HTTP_INSTANCE.LOGIN.replace(
        "<%Ambiente%>",
        "api-sineli"
      );
      httpInstanceBasics.defaults.baseURL = HTTP_INSTANCE.BASICS.replace(
        "<%Ambiente%>",
        "api-sineli"
      );
      httpInstanceCreditos.defaults.baseURL = HTTP_INSTANCE.CREDITOS.replace(
        "<%Ambiente%>",
        "sineli"
      );
      httpInstanceDocumentos.defaults.baseURL =
        HTTP_INSTANCE.DOCUMENTOS.replace("<%Ambiente%>", "sineli");
      httpInstanceSysWebApp.defaults.baseURL =
        httpInstanceSysWebApp.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "syswebappcredito"
        );
    } else {
      httpInstanceLogin.defaults.baseURL = HTTP_INSTANCE.LOGIN.replace(
        "<%Ambiente%>",
        "sineli"
      );
      httpInstanceBasics.defaults.baseURL = HTTP_INSTANCE.BASICS.replace(
        "<%Ambiente%>",
        "sineli"
      );
      httpInstanceCreditos.defaults.baseURL = HTTP_INSTANCE.CREDITOS.replace(
        "<%Ambiente%>",
        "sineli"
      );
      httpInstanceDocumentos.defaults.baseURL =
        HTTP_INSTANCE.DOCUMENTOS.replace("<%Ambiente%>", "sineli");
      httpInstanceSysWebApp.defaults.baseURL =
        httpInstanceSysWebApp.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "syswebappcredito"
        );
    }
  };
  return {
    CambiosRuta,
  };
};
