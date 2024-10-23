import * as TokenService from "../../../services/template/administradorAplicativo/TokenService";
export const useToken = () => {
  const EncriptarDesencriptarToken = async (Texto: string, Tipo: string) => {
    let respuesta;
    try {
      let AjaxObj = {
        texto: Texto,
        tipo: Tipo,
      };
      respuesta = await TokenService.EncriptarDesencriptarToken(AjaxObj);
      return respuesta.response;
    } catch (error) {
      throw (respuesta = error);
    }
  };
  return { EncriptarDesencriptarToken };
};
