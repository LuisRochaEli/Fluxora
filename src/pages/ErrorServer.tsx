import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HTTP_STATUS } from "../Constants";

export const ErrorServer = (props: {
  CodigoErrorAdvertencia?: number;
  setCodigoErrorAdvertencia?: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}) => {
  const { CodigoErrorAdvertencia, setCodigoErrorAdvertencia } = props;

  //#region HOOKS
  const [t] = useTranslation("global");
  //#endregion

  //#region USESTATE
  const [MensajeAdvertencia, setMensajeAdvertencia] = useState<string>("");
  const [MensajeCompleto, setMensajeCompleto] = useState<string>("");
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  //#endregion

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      switch (CodigoErrorAdvertencia) {
        case HTTP_STATUS.NO_CONTENT:
          if (setCodigoErrorAdvertencia) {
            setCodigoErrorAdvertencia(HTTP_STATUS.BAD_REQUEST);
          }
          setMensajeAdvertencia(t("InformationNotFound"));
          setMensajeCompleto(
            t("SorryButInformationLookingIsTemporarilyUnavailable")
          );
          break;
        case HTTP_STATUS.NOT_FOUND:
          setMensajeAdvertencia(t("PageNotFound"));
          setMensajeCompleto(t("SorryButPageLookingIsTemporarilyUnavailable"));
          break;
        default:
          setMensajeAdvertencia("");
          setMensajeCompleto("");
          break;
      }
    })();
  }, []);
  //#endregion
  return (
    <>
      <div className="relative h-[100vh] mx-4">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pl-[160px] w-[100%] max-w-[560px]">
          <div className="absolute left-0 top-0 inline-block w-[140px] h-[140px] bg-cover bg-[url(https://colorlib.com/etc/404/colorlib-error-404-18/img/emoji.png)]">
            <div className="absolute w-[100%] h-[100%] rounded-[50%] bg-[#f2f5f8] z-[-1] scale-[2.4]"></div>
          </div>
          <h1 className="font-montserrat text-[65px] font-bold mt-0 mb-[5px] text-black uppercase">
            {CodigoErrorAdvertencia}
          </h1>
          <h2 className="font-montserrat text-[21px] font-normal m-0 text-black uppercase">
            {`Oops! ${MensajeAdvertencia}`}
          </h2>
          <p className="font-montserrat font-normal text-[#999fa5] text-xs text-justify mt-1">
            {MensajeCompleto}
          </p>
        </div>
      </div>
    </>
  );
};
