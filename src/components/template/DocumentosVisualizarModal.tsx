import { useTranslation } from "react-i18next";
import { Modal } from ".";
import { useEffect, useState } from "react";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import { CiFileOff } from "react-icons/ci";

export const DocumentosVisualizarModal = (props: any) => {
  const { isOpenModal, closeModal, ArrayDocumentos } = props;
  //#region HOOKS
  const [t] = useTranslation("global");
  //#endregion HOOKS

  //#region VARIABLES
  //#endregion VARIABLES

  //#region USESTATE
  const [DocumentoActual, setDocumentoActual] = useState<any>(null);
  //#endregion USESTATE

  //#region FUNCIONES
  //#endregion FUNCIONES

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      if (ArrayDocumentos.length > 0) {
        setDocumentoActual(ArrayDocumentos[0]);
      } else {
        setDocumentoActual(null);
      }
    })();
  }, [ArrayDocumentos]);
  //#endregion USEEFFECT

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        size="lg"
        focus={false}
        fullscreen={"md-down"}
      >
         <div className="modal-header bg-skin-primary/70 text-white text-skin-primary/80 text-2xl font-semibold py-2 px-4 justify-between">
          <h3 className="title-tw-modal">
            <i className="i-doc-inv"></i>
            {t("FileViewer")}
          </h3>
          <button
            type="button"
            className="close-tw"
            onClick={closeModal}
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body card-body-modal card m-2 px-3">
          <div className="grid grid-cols-1 w-fill m-1">
            {DocumentoActual ? (
              DocumentoActual.descripcion ? (
                <>
                  <label className="text-skin-primary/80 font-medium">
                    <i className="i-right-open text-xs"></i>
                    {DocumentoActual
                      ? DocumentoActual.descripcion
                        ? DocumentoActual.descripcion
                        : t("FileNotAvailable")
                      : t("FileNotAvailable")}
                  </label>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <div className="mt-2">
              {DocumentoActual ? (
                DocumentoActual.extension ? (
                  /pdf/gi.test(DocumentoActual?.extension) ? (
                    <iframe
                      className="w-[100%] h-[100%]"
                      src={DocumentoActual.url}
                      frameBorder={"0"}
                    />
                  ) : (
                    <div className="w-[100%] h-[500px] overflow-hidden">
                      <ReactPanZoom
                        image={
                          DocumentoActual.base64
                            ? `data:image/jpeg;base64,${DocumentoActual.base64}`
                            : DocumentoActual.url
                        }
                      />
                    </div>
                  )
                ) : (
                  <FileNotAvailable />
                )
              ) : (
                <FileNotAvailable />
              )}
            </div>
            <div className="flex justify-center gap-2">
              {ArrayDocumentos.length > 1 && (
                <>
                  {ArrayDocumentos.map((x: any, index: number) => (
                    <button
                      className="btn-tw-primary px-2"
                      key={index}
                      onClick={() => setDocumentoActual(x)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className={`btn btn-outline-secondary`}>
            {`${t("Close")}`}
          </button>
        </div>
      </Modal>
    </>
  );
};

const FileNotAvailable = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <div className="flex justify-center">
        <CiFileOff size={200} className="text-skin-primary/80" />
      </div>
      <div className="flex justify-center text-2xl text-skin-primary/80 items-center">
        {t("FileNotAvailable")}
      </div>
    </>
  );
};
