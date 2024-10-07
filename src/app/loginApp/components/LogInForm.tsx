import { useSpinLoadStore } from "../../../store/template/useSpinLoadStore";
import LogoSVG from "../../../assets/Logo_2.svg";
import { useTranslation } from "react-i18next";
import { useLogIn } from "../hooks/useLogIn";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChangeRegex } from "../../../helpers/FormatosRegex";
import { FormikTexto } from "../../../components/customFormik";
import { useSwal } from "../../../hooks";
import { useState } from "react";
import { useAmbienteStore } from "../../../store/template/useAmbienteStore";
import { DesencriptarValores, EncriptarValores } from "../../../helpers/Crypto";
import { AMBIENTES, NOMBRES_API } from "../../../Constants";
import { useAuthStore } from "../../../store";
import { useParametro } from "../../../hooks/template/administradorAplicativo/useParametro";
import * as TokenConfig from "../../../helpers/CookieToken";

export const LogInForm = () => {
  //#region HOOKS
  const [t] = useTranslation("global");
  const { AccederUsuario } = useLogIn();
  // const { ValidarImpresoras } = useBridge();
  const { MostrarMensaje } = useSwal();
  const { MostrarCarga, OcultarCargar } = useSpinLoadStore();
  const { Ambiente, setAmbiente } = useAmbienteStore();
  const { onChecking } = useAuthStore();
  const { ObtenerTokenTablaMaestraFiltros } = useParametro();
  //#endregion HOOKS

  //#region USESTATE
  const [ContadorClic, setContadorClic] = useState(0);
  //#endregion USESTATE

  //#region VARIABLES
  //#endregion VARIABLES

  //#region FUNCIONES
  const esquemaValidacion = Yup.object().shape({
    usuario: Yup.string().trim().required(t("Required")),
    contrasena: Yup.string().trim().required(t("Required")),
  });

  const ManejoCambioUsuario = (
    e: React.FormEvent<HTMLInputElement>,
    formik: any,
    field: string
  ) => {
    const inputValue = e.currentTarget.value;
    formik.setFieldValue(field, ChangeRegex.ChangeToNumberInt(inputValue));
  };
  //#endregion FUNCIONES

  //#region USEEFFECT
  //#endregion USEEFFECT
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          usuario: "",
          contrasena: "",
        }}
        validationSchema={esquemaValidacion}
        onSubmit={async (values) => {
          MostrarCarga();
          try {
            onChecking();
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
            // await ValidarImpresoras(0);
            await AccederUsuario(
              values.usuario.trim(),
              values.contrasena,
              (19).toString()
            );
            OcultarCargar();
          } catch (error: any) {
            MostrarMensaje("error", error.mensaje);
            OcultarCargar();
          }
        }}
      >
        {(formik) => (
          <>
            <div className="grid grid-flow-row items-center justify-center w-fit px-8 sm:px-0 md:px-16 text-LogLightText rounded-3xl border-[1px] backdrop-blur-[3px] transition duration-1000 ease-in-out relative py-4 shadow-lg">
              <div className="grid justify-center items-center w-full sm:w-4/6 md:w-full mx-auto gap-y-3 mt-3">
                <div className="flex justify-center mb-1">
                  <img
                    src={LogoSVG}
                    onClick={() => {
                      const Contador = ContadorClic + 1;
                      if (Contador === 10) {
                        setContadorClic(0);
                        if (
                          DesencriptarValores(Ambiente ? Ambiente : "") ===
                          AMBIENTES.PRODUCCION
                        ) {
                          setAmbiente(EncriptarValores(AMBIENTES.QA));
                        } else {
                          setAmbiente(EncriptarValores(AMBIENTES.PRODUCCION));
                        }
                      } else {
                        setContadorClic(Contador);
                      }
                    }}
                  />
                </div>
                {DesencriptarValores(Ambiente ? Ambiente : "") ===
                  AMBIENTES.QA && (
                  <div className="text-xs text-skin-primary/80 text-center border-1 rounded-xl py-1 border-skin-primary/30 ">
                    {t("TestingEnvironment")}
                  </div>
                )}
                <FormikTexto
                  type="text"
                  name="usuario"
                  label={t("User")}
                  focus="text-red-400"
                  bg="bg-green-400"
                  icon="i-user"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    ManejoCambioUsuario(e, formik, "usuario")
                  }
                />
                <FormikTexto
                  type="password"
                  name="contrasena"
                  label={t("Password")}
                  focus="text-red-400"
                  bg="bg-green-400"
                  icon="i-lock"
                />{" "}
                <button
                  onClick={(_e) => {
                    formik.handleSubmit();
                  }}
                  type="button"
                  className="btn bg-skin-primary rounded-xl hover:scale-[1.05] transition-all duration-300 ease-in-out peer hover:bg-skin-primary text-white text-sm py-1"
                >
                  <i className="i-login"></i>
                  {t("GetInto")}
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};
