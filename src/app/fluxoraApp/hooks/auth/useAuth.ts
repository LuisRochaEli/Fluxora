import { DesencriptarValores } from "../../../../helpers/Crypto";
import { useAuthStore } from "../../../../store";

export const useAuth = () => {
  const { Usuario } = useAuthStore();
  const ObtenerInformacionUsuarioAuth = () => {
    let DataUsuario: any = Usuario ? DesencriptarValores(Usuario) : null;
    DataUsuario = DataUsuario ? JSON.parse(DataUsuario) : null;
    return DataUsuario && DataUsuario.usuario ? DataUsuario.usuario : null;
  };

  return {
    ObtenerInformacionUsuarioAuth,
  };
};
