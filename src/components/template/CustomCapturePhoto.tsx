import { Camera, CameraResultType } from "@capacitor/camera";
import { useTranslation } from "react-i18next";
import { IoCameraSharp, IoDocumentAttachSharp } from "react-icons/io5";
import write_blob from "capacitor-blob-writer";
import {
  FileOpener,
  FileOpenerOptions,
} from "@capacitor-community/file-opener";
import { Directory } from "@capacitor/filesystem";
// import { useDocumento } from "../../app/sineliApp/hooks/documentos/useDocumento";

export const CustomCapturePhoto = (props: {
  CapturaComprobante: ICustomCapturePhoto | null;
  setCapturaComprobante: React.Dispatch<
    React.SetStateAction<ICustomCapturePhoto | null>
  >;
  LabelCapturaImagen?: string;
}) => {
  const { CapturaComprobante, setCapturaComprobante, LabelCapturaImagen } =
    props;
  //#region HOOKS
  const [t] = useTranslation("global");
  // const { ObtenerTipoMimePorExtension } = useDocumento();
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  const CapturarImagen = async () => {
    try {
      const photoData = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      setCapturaComprobante({
        base64: photoData
          ? photoData.base64String
            ? photoData.base64String
            : null
          : null,
        format: photoData
          ? photoData.format
            ? `.${photoData.format}`
            : null
          : null,
      });
    } catch (error) {
      console.error("Error al capturar la foto:", error);
    }
  };

  const DescargarDocumentoCargado = async (
    base64Data: ICustomCapturePhoto | null,
    fileName: string
  ) => {
    if (base64Data?.base64) {
      const byteCharacters = atob(base64Data?.base64);
      let length = byteCharacters.length;
      let bytes = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        bytes[i] = byteCharacters.charCodeAt(i);
      }
      let blob = new Blob([bytes.buffer], { type: "application/octet-stream" });
      const Window: any = window;
      if (Window.Capacitor.platform === "web") {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        try {
          const result = await write_blob({
            path: `Comprobante${CapturaComprobante ? (CapturaComprobante.format ? CapturaComprobante.format : ".jpg") : ".jpg"}`,
            blob: blob,
            directory: Directory.Data,
            fast_mode: true,
            recursive: false,
          });
          const fileOpenerOptions: FileOpenerOptions = {
            filePath: result,
           // contentType: ObtenerTipoMimePorExtension(result),
            openWithDefault: true,
          };
          await FileOpener.open(fileOpenerOptions);
        } catch {
          try {
            const result = await write_blob({
              path: `Comprobante${CapturaComprobante ? (CapturaComprobante.format ? CapturaComprobante.format : ".jpg") : ".jpg"}`,
              blob: blob,
              directory: Directory.Documents,
              fast_mode: true,
              recursive: false,
            });
            const fileOpenerOptions: FileOpenerOptions = {
              filePath: result,
              //contentType: ObtenerTipoMimePorExtension(result),
              openWithDefault: true,
            };
            await FileOpener.open(fileOpenerOptions);
          } catch (error) {}
        }
      }
    }
  };
  //#endregion

  //#region USEEFFECT
  //#endregion
  return (
    <>
      {CapturaComprobante ? (
        <div
          className="rounded-lg btn-tw-primary w-auto h-auto flex items-center lg:block mx-2 justify-center"
          onClick={() =>
            DescargarDocumentoCargado(
              CapturaComprobante,
              `Comprobante${CapturaComprobante ? (CapturaComprobante.format ? CapturaComprobante.format : ".png") : ".png"}`
            )
          }
        >
          <div className="w-full md:flex justify-center">
            <IoDocumentAttachSharp size={40} />
          </div>
          <label className="text-xs font-semibold text-center">
            {t("DownloadAttacheDocument")}
          </label>
        </div>
      ) : (
        <>
          <button
            className="rounded-lg btn-tw-primary w-auto h-auto md:flex items-center lg:block"
            onClick={CapturarImagen}
          >
            <div className="w-full flex justify-center">
              <IoCameraSharp size={40} />{" "}
            </div>
            <label className="text-xs font-semibold">
              {LabelCapturaImagen ? LabelCapturaImagen : t("CaptureImage")}
            </label>
          </button>
        </>
      )}
    </>
  );
};
