import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
// import { CreditoInvestigacionBuroCredito } from "../../sineliApp/pages/CreditoInvestigacionBuroCredito";
// import { CreditoPerfilEnrolamiento } from "../../sineliApp/pages/CreditoPerfilEnrolamiento";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path={`*`} element={<LoginPage />} />
      {/* <Route path={`InvestigacionBuroCredito/:NIP`} element={<CreditoInvestigacionBuroCredito />} />
      <Route path={`PerfilEnrolamiento/:NIP`} element={<CreditoPerfilEnrolamiento />} /> */}
    </Routes>
  );
};
