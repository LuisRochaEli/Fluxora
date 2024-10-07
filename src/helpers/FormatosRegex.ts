export const ChangeRegex = {
  ChangeToNumberInt: (value: string) =>
    value ? value.toString().replace(/[^0-9]/g, "").replace(/[÷×]/, "") : "",
  ChangeToNumber: (value: string) =>
    value ? value.toString().replace(/[^0-9.]/g, "").replace(/[÷×]/, "") : "",
  ChangeToTextCharacters: (value: string) =>
    value ? value.toString().replace(/[^a-zA-ZÀ-ÿ0-9-ñÑ\s.&]/g, "").replace(/[÷×]/, "") : "",
  ChangeToTextAddress: (value: string) =>
    value ? value.toString().replace(/[^a-zA-ZÀ-ÿ0-9-ñÑ\s()\-.]/g, "").replace(/[÷×]/, "") : "",
  ChangeToText: (value: string) =>
    value ? value.toString().replace(/[^a-zA-ZÀ-ÿ-ñÑ\s]/g, "").replace(/[÷×]/, "") : "",
  ChangeTextNumber: (value: string) =>
    value ? value.toString().replace(/[^a-zA-Z0-9-ñÑ\s]/g, "").replace(/[÷×]/, "") : "",
  ChangeNumberInt: (value: string) =>
    value ? value.toString().replace(/[^0-9]/g, "").replace(/[÷×]/, "") : "",
  ChangeTextNumberRFC: (value: string) =>
    value ? value.toString().replace(/[^a-zA-Z0-9]/g, "").replace(/[÷×]/, "") : "",
};

export const StringToBoolean = (Valor: string) => {
  return Valor === "1";
};

export const IsEmpty = (e: any) => {
  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case false:
    case undefined:
      return true;
    default:
      return false;
  }
};