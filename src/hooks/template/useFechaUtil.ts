import { differenceInYears, isBefore, isEqual, startOfDay } from "date-fns";
import { useTranslation } from "react-i18next";

export const useFechaUtil = () => {
  const [t] = useTranslation("global");
  const ConversionStringToDate = (Fecha: string) => {
    if (Fecha.trim() !== "") {
      let FechaSplit = [];
      if (Fecha.includes("-")) {
        FechaSplit = Fecha.split("-").reverse();
      } else {
        FechaSplit = Fecha.split("/");
      }
      if (FechaSplit.length > 3 || Fecha === "") return "";
      FechaSplit = FechaSplit.map((x: string) => {
        return parseInt(x);
      });
      let FormatoFecha: Date = new Date(
        FechaSplit[2],
        FechaSplit[1] - 1,
        FechaSplit[0]
      );
      return FormatoFecha;
    } else {
      return "";
    }
  };

  const CalcularEdad = (FechaNacimiento: Date) => {
    const FechaActual = startOfDay(new Date());
    let Edad = 0;
    if (
      isBefore(FechaNacimiento, FechaActual) ||
      isEqual(FechaNacimiento, FechaActual)
    ) {
      Edad = differenceInYears(FechaActual, FechaNacimiento);
    }
    const TextoEdad =
      Edad === 1
        ? `${Edad} ${t("Year").toUpperCase()}`
        : `${Edad} ${t("Years").toUpperCase()}`;
    return TextoEdad;
  };

  return {
    ConversionStringToDate,
    CalcularEdad,
  };
};
