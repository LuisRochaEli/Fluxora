import { useParametro } from "../../hooks/template/administradorAplicativo/useParametro";
import {
  AMBIENTES,
  APLICACION_MOVIL,
  NOMBRES_API,
  PARAMETROS,
  SERVER_ROUTE,
} from "../../Constants";
import { DesencriptarValores } from "../../helpers/Crypto";
import { useAmbienteStore } from "../../store/template/useAmbienteStore";
import { FaHome, FaListUl, FaUserPlus } from "react-icons/fa";
import { SideBar } from "../../components/template/SideBar";
import { NavBar } from "../../components/template/NavBar";
import * as TokenConfig from "../../helpers/CookieToken";
import { useTranslation } from "react-i18next";
import { AppRoute } from "./routes/AppRoute";
import { useEffect } from "react";

export const AppFluxora = () => {
  //#region HOOKS
  const [t] = useTranslation("global");

  const { Ambiente } = useAmbienteStore();
  const {
    ObtenerListadoParametrosAplicacion,
    ObtenerTokenTablaMaestraFiltros,
  } = useParametro();
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  const Data: ISideBarMenu[] = [
    {
      id: 1,
      textoMenu: t("HomePage"),
      ruta: `${!APLICACION_MOVIL ? SERVER_ROUTE : ""}/HomePage`,
      icono: <FaHome />,
      subMenu: [],
      idMenuPadre: null,
    },
    {
      id: 2,
      textoMenu: t("Trays.CreditTrays"),
      icono: <FaListUl />,
      // ruta: `${
      //   APLICACION_MOVIL ? "" : SERVER_ROUTE
      // }/Credito/BandejaClientesEnrolamiento`,
      subMenu: [
        {
          id: 2,
          textoMenu: t("Trays.DataConfirmation"),
          icono: <FaUserPlus />,
          ruta: `${!APLICACION_MOVIL ? SERVER_ROUTE : ""}/Credito/BandejaConfirmacionDatos`,
          subMenu: [],
          idMenuPadre: null,
        },
      ],
      idMenuPadre: null,
    },
  ];
  //#endregion

  //#region FUNCIONES
  useEffect(() => {
    (async () => {
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
      const ArrayParametros = await ObtenerListadoParametrosAplicacion();
      const TokenSuma = ArrayParametros.find(
        (x: any) => x.codigo === PARAMETROS.TOKEN_VERIDOC
      );
      TokenConfig.setAuthorizationVeriDocHeader(
        TokenSuma ? (TokenSuma.valor ? TokenSuma.valor : "") : ""
      );
    })();
  }, []);

  //#endregion

  //#region USEEFFECT
  //#endregion

  return (
    <>
      {APLICACION_MOVIL ? (
        <>
          <div className="bg-skin-mainBG h-fit">
            {DesencriptarValores(Ambiente ? Ambiente : "") === AMBIENTES.QA && (
              <>
                <div className="text-xs text-white text-center border-1 py-1 px-2 border-skin-primary/30 z-50 bottom-3 left-4 bg-skin-primary/80 font-medium">
                  {t("TestingEnvironment")}
                </div>
                <div className="bg-white h-1"></div>{" "}
              </>
            )}
            <div className="flex h-[100vh] md:h-[100vh]">
              <SideBar ListadoMenu={Data}></SideBar>
              <main
                className="bg-white overflow-y-auto h-[100vh] md:h-[100vh] w-full"
                id={"theme-container"}
              >
                <NavBar />
                <div className="z-30">
                  <AppRoute />
                </div>
              </main>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-skin-mainBG h-fit">
          <div className="flex h-[100vh] md:h-[100vh]">
            <SideBar ListadoMenu={Data}></SideBar>
            <main
              className="bg-white overflow-y-auto h-[100vh] md:h-[100vh] w-full"
              id={"theme-container"}
            >
              <NavBar />
              <div className="z-30">
                <AppRoute />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};
