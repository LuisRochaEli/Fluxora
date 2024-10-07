import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const ValidacionesYupCredito = () => {
  const [t] = useTranslation("global");

  const EsquemaValidacionCreditoConfirmacionDatos = Yup.object({
    nombre: Yup.string().trim().nullable().required(t("Required")),
    apellidoPaterno: Yup.string().trim().nullable().required(t("Required")),
    apellidoMaterno: Yup.string().trim().nullable().required(t("Required")),
    fechaNacimiento: Yup.string().trim().nullable().required(t("Required")),
    idGenero: Yup.string().trim().nullable().required(t("Required")),
  });

  return {
    EsquemaValidacionCreditoConfirmacionDatos,
  };
};
