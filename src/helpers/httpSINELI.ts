import axios from "axios";
import { PRIVATE_APIKEY_SUMA } from "../Constants";

const httpInstanceBridget = axios.create({
  baseURL: "http://localhost:1301/",
});

httpInstanceBridget.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

//#region API ELIZONDO
const httpInstanceLogin = axios.create({
  baseURL: `https://www.elizondo.mx:5050/<%Ambiente%>/basics/usuario/login/`,
});

httpInstanceLogin.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const httpInstanceBasics = axios.create({
  baseURL: `https://www.elizondo.mx:5050/<%Ambiente%>/basics`,
});

httpInstanceBasics.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const httpInstanceDocumentos = axios.create({
  baseURL: `https://www.elizondo.mx:5050/<%Ambiente%>/documentos`,
});

httpInstanceDocumentos.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const httpInstanceCreditos = axios.create({
  baseURL: 
  `https://www.elizondo.mx:5050/<%Ambiente%>/AppCreditoTest`,
});

httpInstanceCreditos.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
//#endregion API ELIZONDO

//#region API VERI_DOC
const httpInstanceVeriDoc = axios.create({
  baseURL: "https://veridocid.azure-api.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpInstanceVeriDoc.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const httpInstanceVeriDocV3 = axios.create({
  baseURL: "https://veridocid.azure-api.net/api",
  headers: {
    "x-api-key": PRIVATE_APIKEY_SUMA,
    "Content-Type": "application/json",
  },
});

httpInstanceVeriDocV3.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
//#endregion API VERI_DOC

//#region API WHATSAPP
const httpInstanceWhatsApp = axios.create({
  baseURL: "https://api.auronix.com",
  headers: {
    "Content-Type": "application/json",
    apikey: "7128ba34-db02-4273-923b-3f7151f43300",
  },
});

httpInstanceWhatsApp.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
//#endregion API WHATSAPP

const httpInstanceSMS = axios.create({
  baseURL: "https://sms.contacta.mx/api/v2/sms",
  headers: {
    "Content-Type": "application/json",
  },
});

httpInstanceSMS.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const httpInstanceSysWebApp = axios.create({
  baseURL: "https://www.elizondo.mx:5050/<%Ambiente%>/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpInstanceSysWebApp.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export {
  httpInstanceBridget,
  httpInstanceLogin,
  httpInstanceBasics,
  httpInstanceDocumentos,
  httpInstanceVeriDoc,
  httpInstanceVeriDocV3,
  httpInstanceCreditos,
  httpInstanceWhatsApp,
  httpInstanceSMS,
  httpInstanceSysWebApp,
};
