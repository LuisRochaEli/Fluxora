import { useTitulo } from "../hooks/template/useTitulo";
import { useTranslation } from "react-i18next";
import MuebleriaImg from "../../../assets/Muebleria.svg";
import LogoImg from "../../../assets/Logo_2.svg";
import { useEffect } from "react";

export const HomePage = () => {
  //#region HOOKS
  const [t, i18n] = useTranslation("global");
  const { ActualizarTituloNavBar } = useTitulo();
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  //#endregion

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      ActualizarTituloNavBar(t(""));
    })();
  }, [i18n.language]);
  //#endregion

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <div className="text-xl lg:text-2xl font-bold justify-center items-center flex w-full text-black/70">
          <label>{t("Welcome").toUpperCase()}</label>
        </div>
        <div className="border-b-[2px] w-[13vh] border-black/50"></div>
        <div className="flex items-center justify-center w-full">
          <div className="mx-4 gap-y-8 justify-center my-3 justify-items-center w-full">
            <div className="col-span-3 justify-center flex">
              <img src={LogoImg} className="w-[30vh]" />
            </div>
            <div className="w-full justify-center flex">
              <img src={MuebleriaImg} className="w-[60vh]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
