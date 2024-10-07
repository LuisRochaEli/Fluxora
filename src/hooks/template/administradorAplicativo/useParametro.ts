import { ID_APLICACION } from "../../../Constants";
import { DesencriptarValores, EncriptarValores } from "../../../helpers/Crypto";
import * as ParametroServicio from "../../../services/template/administradorAplicativo/ParametroServicio";
import { useParametroStore } from "../../../store/template/useParametroStore";
export const useParametro = () => {
  const { ConfigParametro, setConfigParametro } = useParametroStore();
  const ObtenerListadoParametrosAplicacion = async () => {
    try {
      let respuesta =
        await ParametroServicio.ObtenerListadoParametrosAplicacion(
          ID_APLICACION
        );
      const EncriptarParametros = EncriptarValores(JSON.stringify(respuesta));
      setConfigParametro(EncriptarParametros);
      return respuesta;
    } catch (error) {
      setConfigParametro(null);
      return [];
    }
  };

  const ObtenerParametroCodigo = (Codigo: string) => {
    const DesencriptarParametro = DesencriptarValores(
      ConfigParametro ? ConfigParametro : ""
    );
    if (DesencriptarParametro && DesencriptarParametro !== "") {
      const ListadoParametro = JSON.parse(DesencriptarParametro);
      const ItemParametro = ListadoParametro.find(
        (x: any) => x.codigo === Codigo
      );
      return ItemParametro ? ItemParametro : null;
    } else {
      return null;
    }
  };

  const ObtenerTokenTablaMaestraFiltros = async (NombreAPI: string) => {
    try {
      let respuesta =
        await ParametroServicio.ObtenerTokenTablaMaestraFiltros(NombreAPI);
      return respuesta;
    } catch (error) {
      return null;
    }
  };

  return {
    ObtenerListadoParametrosAplicacion,
    ObtenerParametroCodigo,
    ObtenerTokenTablaMaestraFiltros
  };
};
