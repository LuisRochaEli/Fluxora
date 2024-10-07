import { useLogInStore } from "../../../store/logIn/useLogInStore";
import * as LogInServicio from "../services/LogInServicio";
import { useSwal } from "../../../hooks";
import { useAuthStore } from "../../../store";

export const useLogIn = () => {
  const { MostrarMensaje } = useSwal();
  const { EstablecerUsuario, EstablecerToken } = useLogInStore();
  const { onLogin, onLogout } = useAuthStore();
  const AccederUsuario = async (
    usuario: string,
    contrasena: string,
    sucursal: string
  ) => {
    try {
      const respuesta = await LogInServicio.AccederUsuario({
        usuario,
        contrasena,
        sucursal,
      });
      onLogin({
        fechaExpiracion: respuesta.token_valid_to,
        token: respuesta.token,
        usuario: respuesta.usuario,
      });
      EstablecerUsuario(respuesta.usuario);
      EstablecerToken(respuesta.token);
    } catch (error: any) {
      MostrarMensaje("error", error.mensaje);
      onLogout();
    }
  };

  return {
    AccederUsuario,
  };
};
