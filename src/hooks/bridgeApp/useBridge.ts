import * as BridgeServicio from "../../services/template/BridgeServicio";
export const useBridge = () => {
  const ValidarImpresoras = (usuario: number) => {
    const respuesta = BridgeServicio.ValidarImpresoras(usuario);
    return respuesta;
  };

  return {
    ValidarImpresoras,
  };
};
