import { useTranslation } from "react-i18next";
import * as CatalogoServicio from "../../services/template/catalogos/CatalogoServicio";
import { useCatalogoStore } from "../../store/catalogos/useCatalogoStore";
import { CATALOGO_PAISES, OPCIONESGENERALES_PADRE } from "../../Constants";

export const useCatalogo = () => {
  const {
    ArrayCatalogoEstados,
    setArrayCatalogoEstados,
    ArrayCatalogoCiudades,
    setArrayCatalogoCiudades,
    ArrayCatalogoColonias,
    setArrayCatalogoColonias,
    ArrayCatalogoParentescos,
    setArrayCatalogoParentescos,
    ArrayCatalogoAntiguedad,
    setArrayCatalogoAntiguedad,
    ArrayCatalogoOcupacion,
    setArrayCatalogoOcupacion,
    ArrayCatalogoTipoDomicilio,
    setArrayCatalogoTipoDomicilio,
    ArrayCatalogoOrigenIngresos,
    setArrayCatalogoOrigenIngresos,
    ArrayCatalogoGeneros,
    setArrayCatalogoGeneros,
  } = useCatalogoStore();
  const [t] = useTranslation("global");

  const ConsultarCatalogoEntidadesFederativas = async () => {
    let respuesta;
    try {
      respuesta = await CatalogoServicio.ConsultarEntidadesFederativas(
        CATALOGO_PAISES.MEX
      );
      setArrayCatalogoEstados(
        respuesta.map((x: any) => {
          return { label: x.entidadFederativa, value: x.idEntidadFederativa };
        })
      );
      return respuesta;
    } catch (error) {
      setArrayCatalogoEstados([]);
      throw (respuesta = error);
    }
  };

  const ConsultarCatalogoCiudades = async (
    IdEntidadFederativa: number | null
  ) => {
    let respuesta;
    if (IdEntidadFederativa) {
      try {
        respuesta =
          await CatalogoServicio.ConsultarCiudades(IdEntidadFederativa);
        setArrayCatalogoCiudades(
          respuesta.map((x: any) => {
            return { label: x.ciudad, value: x.idCiudad };
          })
        );
        return respuesta;
      } catch (error) {
        throw (respuesta = error);
      }
    } else {
      setArrayCatalogoCiudades([]);
    }
  };

  const ConsultarCatalogoColonias = async (IdCiudad: number | null) => {
    let OpcionNoEncontrada = {
      label: t("ICantFindNeighborhood").toUpperCase(),
      value: -1,
    };
    let respuesta;
    if (IdCiudad) {
      try {
        respuesta = await CatalogoServicio.ConsultarColonias(IdCiudad);
        let Array = respuesta.map((x: any) => {
          return {
            label: x.colonia,
            value: x.idColonia,
            labelExtra: x.codigoPostal,
          };
        });
        // Array.unshift(OpcionNoEncontrada);
        setArrayCatalogoColonias(Array);
        return respuesta;
      } catch (error) {
        const Array: IOpcionesSeleccion[] = [OpcionNoEncontrada];
        setArrayCatalogoColonias(Array);
        throw (respuesta = error);
      }
    } else {
      setArrayCatalogoColonias([]);
    }
  };

  const ConsultarCatalogosGenerales = async (OpcionPadre: string) => {
    let respuesta: any;
    try {
      const AjaxObj = {
        Activo: true,
        CodigoOpcionPadre: OpcionPadre,
      };
      respuesta = await CatalogoServicio.ConsultarCatalogoGenerales(AjaxObj);
      respuesta = respuesta.opcionesGenerales.map(
        (x: ICatalogoOpcionesGenerales) => {
          return {
            value: x.idOpcionGeneral,
            label: x.opcionGeneral.toUpperCase(),
          };
        }
      );
      switch (OpcionPadre) {
        case OPCIONESGENERALES_PADRE.TIPO_DOMICILIO:
          setArrayCatalogoTipoDomicilio(respuesta);
          break;
        case OPCIONESGENERALES_PADRE.ANTIGUEDAD:
          setArrayCatalogoAntiguedad(respuesta);
          break;
        case OPCIONESGENERALES_PADRE.OCUPACIONES:
          setArrayCatalogoOcupacion(respuesta);
          break;
        case OPCIONESGENERALES_PADRE.ORIGEN_INGRESOS:
          setArrayCatalogoOrigenIngresos(respuesta);
          break;
        case OPCIONESGENERALES_PADRE.PARENTESCOS:
          setArrayCatalogoParentescos(respuesta);
          break;
      }
      return respuesta;
    } catch (error) {
      switch (OpcionPadre) {
        case OPCIONESGENERALES_PADRE.TIPO_DOMICILIO:
          setArrayCatalogoTipoDomicilio([]);
          break;
        case OPCIONESGENERALES_PADRE.ANTIGUEDAD:
          setArrayCatalogoAntiguedad([]);
          break;
        case OPCIONESGENERALES_PADRE.OCUPACIONES:
          setArrayCatalogoOcupacion([]);
          break;
        case OPCIONESGENERALES_PADRE.ORIGEN_INGRESOS:
          setArrayCatalogoOcupacion([]);
          break;
        case OPCIONESGENERALES_PADRE.PARENTESCOS:
          setArrayCatalogoParentescos([]);
          break;
      }
      throw (respuesta = error);
    }
  };

  const ConsultarCatalogoGeneros = async () => {
    let respuesta;
    try {
      respuesta = await CatalogoServicio.ConsultarCatalogoGenerosSociales();
      setArrayCatalogoGeneros(
        respuesta.map((x: any) => {
          return { label: x.genero.toUpperCase(), value: x.idGenero };
        })
      );
      return respuesta;
    } catch (error) {
      setArrayCatalogoGeneros([]);
      throw (respuesta = error);
    }
  };

  return {
    //Metodos
    ConsultarCatalogoEntidadesFederativas,
    ConsultarCatalogoCiudades,
    ConsultarCatalogoColonias,
    ConsultarCatalogosGenerales,
    ConsultarCatalogoGeneros,
    //Propiedades
    ArrayCatalogoEstados,
    ArrayCatalogoCiudades,
    ArrayCatalogoColonias,
    ArrayCatalogoParentescos,
    ArrayCatalogoAntiguedad,
    ArrayCatalogoOcupacion,
    ArrayCatalogoTipoDomicilio,
    ArrayCatalogoOrigenIngresos,
    ArrayCatalogoGeneros,
  };
};
