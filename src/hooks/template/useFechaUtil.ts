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
      if (FechaSplit[2] >= 100) {
        let FormatoFecha: Date = new Date(
          FechaSplit[2],
          FechaSplit[1] - 1,
          FechaSplit[0]
        );
        return FormatoFecha;
      } else {
        let FormatoFecha: Date = new Date(
          `${PadStartConCeros(FechaSplit[2], 4)}-${PadStartConCeros(FechaSplit[1], 2)}-${PadStartConCeros(FechaSplit[0] + 1, 2)}`
        );
        return FormatoFecha;
      }
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

  const PadStartConCeros = (num: number, totalLength: number) => {
    return num.toString().padStart(totalLength, "0");
  };

  return {
    ConversionStringToDate,
    CalcularEdad,
  };
};
