import { Route, Routes, Navigate } from "react-router-dom";
import { AppLogin } from "../app/loginApp/AppLogin";
import { LoadPage } from "../app/loginApp/pages/LoadPage";
import {
  SERVER_ROUTE,
  APLICACION_MOVIL,
  ESTATUS_AUTENTICACION,
  TOKEN_KEY,
} from "../Constants";
import { AppFluxora } from "../app/fluxoraApp/AppFluxora";
import defineConfig from "../../package.json";
import { useAuthStore } from "../store";
import { DesencriptarValores } from "../helpers/Crypto";
import { httpInstanceCreditos } from "../helpers/httpSINELI";

export const AppRoute = () => {
  const { EstatusAutenticacion } = useAuthStore();

  console.log(APLICACION_MOVIL)
  return (
    <div className="m-0 p-0">
      <Routes>
        {DesencriptarValores(EstatusAutenticacion) ===
          ESTATUS_AUTENTICACION.AUTHENTICATED &&
        httpInstanceCreditos.defaults.headers.common.Authorization ? (
          <>
            <Route
              path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
              element={<AppFluxora />}
            />
            <Route
              path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
              element={<Navigate to={`${SERVER_ROUTE}`} />}
            />
          </>
        ) : DesencriptarValores(EstatusAutenticacion) ===
            ESTATUS_AUTENTICACION.AUTHENTICATED &&
          !httpInstanceCreditos.defaults.headers.common.Authorization ? (
          <Route
            path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
            element={<LoadPage />}
          />
        ) : DesencriptarValores(EstatusAutenticacion) ===
          ESTATUS_AUTENTICACION.NOTAUTHENTICATED ? (
          <>
            <Route
              path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
              element={<AppLogin />}
            />
            {!localStorage.getItem(TOKEN_KEY) && (
              <Route
                path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
                element={<Navigate to={`${SERVER_ROUTE}`} />}
              />
            )}
          </>
        ) : DesencriptarValores(EstatusAutenticacion) ===
          ESTATUS_AUTENTICACION.CHECKING ? (
          <>
            <Route
              path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
              element={<LoadPage />}
            />
            <Route
              path={`${APLICACION_MOVIL ? "" : defineConfig.homepage}*`}
              element={<Navigate to={`${SERVER_ROUTE}`} />}
            />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
};
