import { LogInForm } from "../components/LogInForm";
import { useTranslation } from "react-i18next";
import defineConfig from "../../../../package.json"

export const LoginPage = () => {
  //#region HOOKS
  const [t] = useTranslation("global");
  //#endregion HOOKS

  //#region USESTATE
  //#endregion USESTATE

  //#region VARIABLES
  //#endregion VARIABLES

  //#region FUNCIONES
  //#endregion FUNCIONES

  //#region USEEFFECT
  //#endregion USEEFFECT

  return (
    <div className="flex w-[100%] sm:w-full h-full items-center justify-center">
      <div className="h-full w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
          <div className="bg-repeat bg-login-img flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#DC3545] font-semibold text-2xl sm:text-4xl md:text-4xl lg:text-6xl mb-0 md:mb-2">
                {t("Welcome")}
              </p>
              <p className="text-md sm:text-sm md:text-sm lg:text-2xl">
                {t("EnterYourUsernameAndPassword")}
              </p>
            </div>
            <p className="absolute bottom-3 left-4 text-xs text-black/70">{`${t(
              "Version"
            )} ${defineConfig.version}`}</p>
          </div>
          <div className="col-span-2 justify-center flex items-center">
            <LogInForm />
          </div>
        </div>
      </div>
    </div>
  );
};
