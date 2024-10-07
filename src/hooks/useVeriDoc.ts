import { useUtileriasAutorizacionesStore } from "../app/sineliApp/store/useUtileriasAutorizacionesStore";
import { useParametro } from "./template/administradorAplicativo/useParametro";
import { useClienteStore } from "../app/sineliApp/store/useClienteStore";
import * as VeriDocServicio from "../services/template/VeriDocServicio";
import { ORIGEN_DATA_VERIDOC, PARAMETROS } from "../Constants";
import { StringToBoolean } from "../helpers/FormatosRegex";
import { EncriptarValores } from "../helpers/Crypto";

export const useVeriDoc = () => {
  const {
    ClienteUUID,
    setClienteUUID,
    EstatusVerificacion,
    setEstatusVerificacion,
    ResultadoVerificacion,
    setResultadoVerificacion,
    setInformacionCliente,
    setLineaCreditoSolicitado,
    setListadoHomonimos,
  } = useClienteStore();
  const { ObtenerParametroCodigo } = useParametro();
  const {
    setCantidadClicReenvioCelular,
    setCantidadClicReenvioCorreo,
    setCodigoSeguridadMedioContacto,
    setTiempoCodigoSeguridadMedioContacto,
  } = useUtileriasAutorizacionesStore();
  const CrearVerificacion = async () => {
    let respuesta;
    try {
      const AjaxObj = {
        id: "Elizondo",
        options: {
          checks: {
            selfie: StringToBoolean(ObtenerParametroCodigo(PARAMETROS.SDK_VERIDOC_SELFIE).valor),
            verifyIp: false,
            onlyVerifyID: true,
          },
          redirect_url: "",
        },
      };
      respuesta = await VeriDocServicio.CrearVerificacion(AjaxObj);
      setClienteUUID(respuesta);
    } catch (error) {
      setClienteUUID(null);
      throw (respuesta = error);
    }
    return respuesta;
  };

  const ObtenerEstatusVerificacion = async (UUID: string | null) => {
    let respuesta;
    try {
      const AjaxObj = {
        uuid: UUID,
      };
      respuesta = await VeriDocServicio.ObtenerEstatusVerificacion(AjaxObj);
      setEstatusVerificacion(respuesta);
    } catch (error) {
      setEstatusVerificacion(null);
      throw (respuesta = error);
    }
    return respuesta;
  };

  const ObtenerResultadosVerificacion = async (UUID: string | null) => {
    let respuesta;
    try {
      const AjaxObj = {
        uuid: UUID,
        includeImages: true,
        includeProofAdress: true,
      };
      respuesta = await VeriDocServicio.ObtenerResultadosVerificacion(AjaxObj);
      setResultadoVerificacion(respuesta);
    } catch (error) {
      throw (respuesta = error);
    }
    return respuesta;
  };

  const CapturarNuevamenteIdentificacion = () => {
    setClienteUUID(null);
    setEstatusVerificacion(null);
    setResultadoVerificacion(null);
    setInformacionCliente(null);
    setLineaCreditoSolicitado(null);
    setCantidadClicReenvioCelular(EncriptarValores(0));
    setCantidadClicReenvioCorreo(EncriptarValores(0));
    setCodigoSeguridadMedioContacto(null);
    setTiempoCodigoSeguridadMedioContacto(null);
    setListadoHomonimos([]);
  };

  const ObtenerValorCampo = (
    Tipo: string,
    Origen: string = ORIGEN_DATA_VERIDOC.VISUAL
  ) => {
    const ArrayValor = ResultadoVerificacion
      ? ResultadoVerificacion.documentData
        ? ResultadoVerificacion.documentData.filter(
            (x: IDocumentData) => x.type === Tipo
          )
        : []
      : [];
    let ValorVisual = ArrayValor.find((x: any) => x.source === Origen);
    if (ValorVisual) {
      return ValorVisual ? (ValorVisual.value ? ValorVisual.value : "") : "";
    } else {
      return ArrayValor
        ? ArrayValor[0]
          ? ArrayValor[0].value
            ? ArrayValor[0].value
            : ""
          : ""
        : "";
    }
  };

  return {
    //Metodos
    CrearVerificacion,
    ObtenerEstatusVerificacion,
    ObtenerResultadosVerificacion,
    CapturarNuevamenteIdentificacion,
    ObtenerValorCampo,
    setClienteUUID,
    setEstatusVerificacion,
    setInformacionCliente,
    //Propiedades
    ClienteUUID,
    EstatusVerificacion,
    ResultadoVerificacion,
  };
};
