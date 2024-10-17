import { useEffect } from "react";
import { AppRoute } from "./routes/AppRoute";
// import { useNavigate } from "react-router-dom";
// import { APLICACION_MOVIL, SERVER_ROUTE } from "../../Constants";

export const AppLogin = () => {
  //#region HOOKS
  // const NavegarRuta = useNavigate()
  //#endregion HOOKS

  //#region USESTATE
  //#endregion USESTATE

  //#region VARIABLES
  //#endregion VARIABLES

  //#region FUNCIONES
  //#endregion FUNCIONES

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      // NavegarRuta(`${APLICACION_MOVIL ? "" : SERVER_ROUTE}`);
    })();
  }, []);
  
  //#endregion USEEFFECT
  return (
    <div className="h-[100vh]">
      <AppRoute />
    </div>
  );
};
