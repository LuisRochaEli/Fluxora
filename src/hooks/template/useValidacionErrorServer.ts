export const ValidacionErrores = (ServerResponse: any) => {
  let Errosvr;
  if (ServerResponse?.response?.data) {
    if (
      ServerResponse.response.data.status &&
      ServerResponse.response.data.response
    ) {
      Errosvr = {
        codigo: ServerResponse.response.data.status,
        mensaje: ServerResponse.response.data.response,
      };
    } else {
      Errosvr = {
        codigo: 404,
        mensaje: ServerResponse?.response?.data,
      };
    }
  } else if (ServerResponse?.message === "Network Error") {
    Errosvr = {
      codigo: 600,
      mensaje: "PleaseCheckInternetConnection",
    };
  } else if (
    ServerResponse?.response &&
    ServerResponse?.response?.status === 404 &&
    ServerResponse?.response?.data
  ) {
    Errosvr = { codigo: 404, mensaje: ServerResponse.response.data.response };
  } else {
    Errosvr = { codigo: 600, mensaje: "UnexpectedError" };
  }
  return Errosvr;
};
