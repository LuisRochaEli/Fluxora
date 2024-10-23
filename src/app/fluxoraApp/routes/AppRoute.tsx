import { Navigate, Route, Routes } from "react-router-dom";
import { BandejaConfirmacionDatos } from "../pages/credito/BandejaConfirmacionDatos";
import { HomePage } from "../../../pages/Home";
import { RedirectionPage } from "../../loginApp/pages/RedirectionPage";
// import { HomePage } from "../pages/Home";
// import { CreditoBandejaClientesEnrolamiento } from "../pages/CreditoBandejaClientesEnrolamiento";
// import { CreditoDatosPersonales } from "../pages/credito/CreditoDatosPersonales";
// import { CreditoDatosContacto } from "../pages/credito/CreditoDatosContacto";
// import { CreditoDatosAdicionales } from "../pages/credito/CreditoDatosAdicionales";
// import { CreditoReferenciaPersonales } from "../pages/credito/CreditoReferenciaPersonales";
// import { CreditoAutorizaciones } from "../pages/credito/CreditoAutorizaciones";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path={`PaginaPrincipal`} element={<HomePage></HomePage>} />
      <Route
        path={`Credito/BandejaConfirmacionDatos`}
        element={<BandejaConfirmacionDatos />}
      />

      <Route path={`*`} element={<Navigate to={`PaginaPrincipal`} />} />
      <Route path={`Redirection/:Page/:Token`} element={<RedirectionPage />} />
      {/* Rutas del Proyecto */}
      {/* <Route path={``} element={<CreditoDatosPersonales />} /> */}
      {/* <Route
        path={`Credito/DatosPersonales`}
        element={<CreditoDatosPersonales />}
      />
      <Route
        path={`Credito/DatosContacto`}
        element={<CreditoDatosContacto />}
      />
      <Route
        path={`Credito/DatosAdicionales`}
        element={<CreditoDatosAdicionales />}
      />
      <Route
        path={`Credito/Referencias`}
        element={<CreditoReferenciaPersonales />}
      />
      <Route
        path={`Credito/Autorizaciones`}
        element={<CreditoAutorizaciones />}
      /> */}
    </Routes>
  );
};
