import { differenceInSeconds } from "date-fns";
import { IGuardarToken } from "../../../@Types/IToken";
import { useAuthStore } from "../../../store";
import { DesencriptarValores } from "../../../helpers/Crypto";

export const useToken = () => {
  const { Usuario, onLogout } = useAuthStore();

  const ObtenerTokenSession = (): IGuardarToken | null => {
    let sesion: IGuardarToken | null = null;
    let cadena = Usuario ? DesencriptarValores(Usuario ? Usuario : "") : null;
    if (cadena !== null) {
      const FechaActual = new Date();
      let tmp: IGuardarToken = JSON.parse(cadena);
      const FechaExpiracion = new Date(tmp.fechaExpiracion);
      let Diferencia = differenceInSeconds(FechaActual, FechaExpiracion);
      if (Diferencia >= 0) {
        onLogout();
      } else {
        sesion = tmp;
      }
    }
    return sesion;
  };

  return {
    ObtenerTokenSession,
  };
};
