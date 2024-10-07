import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa";
import SignaturePad from "react-signature-pad-wrapper";

export const CustomSignaturePad = (props: {
  SignaturePadRef: any;
  LimpiarFirma: () => void;
  AceptarFirma: () => void;
}) => {
  const { SignaturePadRef, LimpiarFirma, AceptarFirma } = props;
  //#region HOOKS
  const [t] = useTranslation("global");
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  //#endregion

  //#region USEEFFECT
  //#endregion
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2">
        <div className="lg:col-span-3 text-sm font-semibold text-skin-primary flex items-center gap-1">
          <FaChevronRight />
          {t("DigitalSignature").toUpperCase()}
        </div>
        <div className="border-skin-primary/50 border-1 rounded-xl w-full col-span-2 relative p-2">
          <SignaturePad
            ref={SignaturePadRef}
            options={{ minWidth: 0.5, maxWidth: 2, penColor: "black" }}
          />
          <div className="text-center text-black/40 text-xs border-t-1 border-black/20 pt-1 mt-1 mx-14">
            {t("SignHere")}
          </div>
        </div>
        <div className="flex lg:grid grid-cols-1 items-center justify-center">
          <button
            className="btn-tw-third rounded-lg text-xs w-3/4 mx-8 lg:h-2/4"
            onClick={LimpiarFirma}
          >
            {t("Clean")}
          </button>
          <button
            className="btn-tw-third rounded-lg text-xs w-3/4 mx-8 lg:h-2/4"
            onClick={AceptarFirma}
          >
            {t("SignContract")}
          </button>
        </div>
      </div>
    </>
  );
};
