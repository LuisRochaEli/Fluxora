type RespuestaBase = {
  response: string;
  status: number;
  errors: null | string[];
};

interface IResultadoEPObtenerTokenVeriDoc extends BaseResponse {
  token: string;
}

interface IResultadoEPObtenerSegundosEspera extends BaseResponse {
  segundos: number;
}