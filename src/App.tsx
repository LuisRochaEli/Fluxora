import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./routes/AppRoute";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
// import { useCurrentCompany } from "./hooks";
import { SpinerLoad } from "./components/template/SpinerLoad";
// import { useCompany } from "./hooks/templateHooks4/useCompany";
import { ErrorServer } from "./pages/ErrorServer";
// import { useTheme } from "./hooks";
import { IonApp, setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { useToken } from "./app/loginApp/hooks/useToken";
import { useLogInStore } from "./store/logIn/useLogInStore";
import { useAmbienteStore } from "./store/template/useAmbienteStore";
import { CambioRutasAPI } from "./helpers/CookieToken";
import { useParametro } from "./hooks/template/administradorAplicativo/useParametro";
import * as TokenConfig from "./helpers/CookieToken";
import { HTTP_STATUS, NOMBRES_API } from "./Constants";

export const App = () => {
  setupIonicReact();
  // const { GetCurrentCompany, setCurrentCompany, Company } = useCurrentCompany();
  // const CompanyHook = useCompany();

  const [HasErrorLoadCompany] = useState(false);
  // const { UpdateCompanyTheme } = useTheme();
  const theme = useState("theme_Lastrack");
  const { ObtenerTokenSession } = useToken();
  const { EstablecerToken, EstablecerUsuario, ResetSession } = useLogInStore();
  const { Ambiente } = useAmbienteStore();
  const { CambiosRuta } = CambioRutasAPI();
  const { ObtenerTokenTablaMaestraFiltros } = useParametro();
  // useState(
  //   "theme_Multitraslados theme_Multitrans theme_Lastrack theme_360Logistics theme_AZCommerce theme_UsoInterno "
  // );

  // useEffect(() => {
  //   (async () => {
  //     MostrarCarga();
  //     await LoadParameter();
  //     let Companyjson = await GetCurrentCompany();
  //     if (!Companyjson.errorMessage) {
  //       let CompanySession = await CompanyHook.CompanyItem(
  //         Companyjson.IdCompany
  //       );
  //       if (!CompanySession.errorMessage) {
  //         await setCurrentCompany({ ...CompanySession, ...Companyjson });
  //         settheme(`theme_${CompanySession.companyName.replace(" ", "")}`);
  //         UpdateCompanyTheme(
  //           `theme_${CompanySession.companyName.replace(" ", "")}`
  //         );
  //       } else {
  //         setHasErrorLoadCompany(true);
  //       }
  //     } else {
  //       setHasErrorLoadCompany(true);
  //     }
  //     OcultarCargar();
  //   })();
  // }, []);

  // useEffect(() => {
  //   //Actualizamos tema si actualizamos la compa�ia actual
  //   if (Company) {
  //     //Cargamos el Tema de la Compa�ia
  //     settheme(`theme_${Company.companyName.replace(" ", "")}`);
  //   }
  // }, [Company]);

  useEffect(() => {
    (async () => {
      CambiosRuta();
    })();
  }, [Ambiente]);

  useEffect(() => {
    (async () => {
      const DatosSession = ObtenerTokenSession();
      if (DatosSession && DatosSession.token !== null) {
        const TokenAPI = await ObtenerTokenTablaMaestraFiltros(
          NOMBRES_API.API_DOCS_V2
        );
        const TokenAPISysWebApp = await ObtenerTokenTablaMaestraFiltros(
          NOMBRES_API.API_ELIZONDO
        );
        TokenConfig.setAuthorizationApiSysWebApp(
          TokenAPISysWebApp
            ? TokenAPISysWebApp.valor_Permitido_STR_TMF
              ? TokenAPISysWebApp.valor_Permitido_STR_TMF
              : ""
            : ""
        );
        TokenConfig.setAuthorizationApiCreditos(
          TokenAPI
            ? TokenAPI.valor_Permitido_STR_TMF
              ? TokenAPI.valor_Permitido_STR_TMF
              : ""
            : ""
        );
        ResetSession();
        EstablecerToken(DatosSession.token);
        EstablecerUsuario(DatosSession.usuario);
      }
    })();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <IonApp className="full-screen bg-skin-mainBG">
        <BrowserRouter>
          <div className={`${theme[0]}`}>
            {1 ? (
              <AppRoute />
            ) : HasErrorLoadCompany ? (
              <ErrorServer
                CodigoErrorAdvertencia={HTTP_STATUS.NOT_FOUND}
              ></ErrorServer>
            ) : (
              <></>
            )}
          </div>
        </BrowserRouter>
      </IonApp>
      <SpinerLoad></SpinerLoad>
    </I18nextProvider>
  );
};