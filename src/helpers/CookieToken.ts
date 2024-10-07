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
import { AMBIENTES } from "../Constants";

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
      httpInstanceLogin.defaults.baseURL =
        httpInstanceLogin.defaults.baseURL?.replace("<%Ambiente%>", "sineli");
      httpInstanceBasics.defaults.baseURL =
        httpInstanceBasics.defaults.baseURL?.replace("<%Ambiente%>", "sineli");
      httpInstanceCreditos.defaults.baseURL =
        httpInstanceCreditos.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "sineli"
        );
      httpInstanceDocumentos.defaults.baseURL =
        httpInstanceDocumentos.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "sineli"
        );
      httpInstanceSysWebApp.defaults.baseURL =
      httpInstanceSysWebApp.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "syswebappcredito"
        );
    } else {
      httpInstanceLogin.defaults.baseURL =
        httpInstanceLogin.defaults.baseURL?.replace("<%Ambiente%>", "sineli");
      httpInstanceBasics.defaults.baseURL =
        httpInstanceBasics.defaults.baseURL?.replace("<%Ambiente%>", "sineli");
      httpInstanceCreditos.defaults.baseURL =
        httpInstanceCreditos.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "sineli"
        );
      httpInstanceDocumentos.defaults.baseURL =
        httpInstanceDocumentos.defaults.baseURL?.replace(
          "<%Ambiente%>",
          "sineli"
        );
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
