import CryptoJS from "crypto-js";
export const EncriptarValores = (Valor: string | number) => {
  const Texto = CryptoJS.AES.encrypt(Valor.toString(), "").toString();
  return Texto;
};

export const DesencriptarValores = (Valor: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(Valor, "");
    const Texto = bytes.toString(CryptoJS.enc.Utf8);
    return Texto;
  } catch (error) {
    return null;
  }
};

export const GeneracionCodigoSeguridad = () => {
  let Caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let LongitudCodigo = 6;
  let Codigo = "";
  for (let i = 0; i < LongitudCodigo; i++) {
    let indice = Math.floor(Math.random() * Caracteres.length);
    Codigo += Caracteres.charAt(indice);
  }
  return Codigo;
};
