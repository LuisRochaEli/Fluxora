import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RedirectionPage } from "../pages/RedirectionPage";
// import { CreditoInvestigacionBuroCredito } from "../../sineliApp/pages/CreditoInvestigacionBuroCredito";
// import { CreditoPerfilEnrolamiento } from "../../sineliApp/pages/CreditoPerfilEnrolamiento";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path={`*`} element={<LoginPage />} />
      <Route path={`Redirection/:Page/:Token`} element={<RedirectionPage />} />
    </Routes>
  );
};
