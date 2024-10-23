import { useParametro } from "../../../hooks/template/administradorAplicativo/useParametro";
import { useToken } from "../../../hooks/template/administradorAplicativo/useToken";
import { DesencriptarValores } from "../../../helpers/Crypto";
import { useAuth } from "../../fluxoraApp/hooks/auth/useAuth";
import * as TokenConfig from "../../../helpers/CookieToken";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorServer } from "../../../pages/ErrorServer";
import { useAuthStore } from "../../../store";
import { useLogIn } from "../hooks/useLogIn";
import { useEffect, useState } from "react";
import { useSwal } from "../../../hooks";
import {
  APLICACION_MOVIL,
  ESTATUS_AUTENTICACION,
  HTTP_STATUS,
  NOMBRES_API,
  SERVER_ROUTE,
  TOKEN_DATOS,
} from "../../../Constants";

export const RedirectionPage = () => {
  //#region HOOKS
  const params = useParams();
  const { EstatusAutenticacion, onChecking, onLogout } = useAuthStore();
  const { ObtenerTokenTablaMaestraFiltros } = useParametro();
  const { AccederUsuario } = useLogIn();
  const { MostrarMensaje } = useSwal();
  const NavegarRuta = useNavigate();
  const { EncriptarDesencriptarToken } = useToken();
  const { history } = window;
  const { ObtenerInformacionUsuarioAuth } = useAuth();
  //#endregion

  //#region USESTATE
  const [CodigoHttpStatus, setCodigoHttpStatus] = useState<number | null>(null);
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  const AuthLoginAutomatico = async (
    Token: string,
    RutaRedireccion: string
  ) => {
    try {
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
      const Usuario = Token.split("_")[0];
      const Contrasena = Token.split("_")[1];
      const Sucursal = Token.split("_")[2];
      if (Usuario && Contrasena && Sucursal) {
        onChecking();
        await AccederUsuario(Usuario, Contrasena, Sucursal.toString());
        NavegarRuta(RutaRedireccion);
        return true;
      }
    } catch (error: any) {
      MostrarMensaje("error", error.mensaje);
      onLogout();
    }
  };

  const ObtenerRutaRedireccionamiento = (PaginaComponente: string) => {
    let RutaRedireccion;
    switch (PaginaComponente) {
      case "Credito_BandejaConfirmacionDatos":
        RutaRedireccion = `${
          APLICACION_MOVIL ? "" : SERVER_ROUTE
        }/Credito/BandejaConfirmacionDatos`;
        break;
    }
    return RutaRedireccion;
  };

  const FuncionalidadRedireccionamiento = async (params: any) => {
    let ErrorRedireccionamiento = true;
    try {
      if (params.Page) {
        const RutaRedireccion = ObtenerRutaRedireccionamiento(params.Page);
        if (RutaRedireccion) {
          if (params.Token) {
            const TokenDesencriptado = await EncriptarDesencriptarToken(
              params.Token,
              TOKEN_DATOS.DESENCRIPTAR
            );
            if (TokenDesencriptado) {
              if (
                DesencriptarValores(EstatusAutenticacion) ===
                ESTATUS_AUTENTICACION.AUTHENTICATED
              ) {
                const UsuarioItem = await ObtenerInformacionUsuarioAuth();
                if (
                  UsuarioItem.id.toString() === TokenDesencriptado.split("_")[0]
                ) {
                  NavegarRuta(RutaRedireccion);
                } else {
                  onLogout();
                  const RespuestaAuth = await AuthLoginAutomatico(
                    TokenDesencriptado,
                    RutaRedireccion
                  );
                  ErrorRedireccionamiento = RespuestaAuth ? false : true;
                }
              } else {
                const RespuestaAuth = await AuthLoginAutomatico(
                  TokenDesencriptado,
                  RutaRedireccion
                );
                ErrorRedireccionamiento = RespuestaAuth ? false : true;
              }
            }
          }
        }
      }
    } catch (error) {
      ErrorRedireccionamiento = true;
    }
    if (ErrorRedireccionamiento) {
      setCodigoHttpStatus(HTTP_STATUS.NOT_FOUND);
    }
  };
  //#endregion

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      history.replaceState({}, "", "Usuario");
      FuncionalidadRedireccionamiento(params);
    })();
  }, [params]);
  //#endregion

  return (
    <>
      {" "}
      <main
        className="bg-white overflow-y-auto h-[100vh] md:h-[100vh] w-full"
        id={"theme-container"}
      >
        {CodigoHttpStatus && CodigoHttpStatus !== HTTP_STATUS.OK && (
          <>
            <ErrorServer
              CodigoErrorAdvertencia={CodigoHttpStatus}
              setCodigoErrorAdvertencia={setCodigoHttpStatus}
            ></ErrorServer>
          </>
        )}
      </main>
    </>
  );
};
