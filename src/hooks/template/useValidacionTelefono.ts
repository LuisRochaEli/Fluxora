import { useState } from "react";
import { ChangeRegex } from "../../helpers/FormatosRegex";
export const useValidacionTelefono = () => {
  const [TelefonoNacional, setTelefonoNacional] = useState(true);
  const [ValidoTelefono, setValidoTelefono] = useState(false);
  const [ValorTelefono, setValorTelefono] = useState("");

  const onChangeMascara = async (value: string, formik: any, name: string) => {
    if (formik && name) formik.setFieldValue(name, value);
    setValorTelefono(value);
    const NumeroTelefono = ChangeRegex.ChangeToNumber(value);
    NumeroTelefono.length > 5
      ? setValidoTelefono(true)
      : setValidoTelefono(false);
    // if (NumeroTelefono.length > 10) {
    // setTelefonoNacional(false);
    // } else {
    setTelefonoNacional(true);
    // }
  };

  const FormateoMascaraTelefono = (Telefono: string) => {
    let LimpiarTelefono = ("" + Telefono).replace(/\D/g, "");
    let EmpatarRegex = LimpiarTelefono.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (EmpatarRegex) {
      return '(' + EmpatarRegex[1] + ') ' + EmpatarRegex[2] + '-' + EmpatarRegex[3];
    }
    return Telefono;
  };
  
  return {
    TelefonoNacional,
    onChangeMascara,
    ValorTelefono,
    ValidoTelefono,
    FormateoMascaraTelefono
  };
};
