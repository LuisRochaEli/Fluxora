import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";
import { DocumentosVisualizarModal } from "./DocumentosVisualizarModal";
import { useModal } from "../../hooks";
import { useState } from "react";

export const SwiperImagenes = (props: any) => {
  const {
    ListadoImagenes,
    SlidesPorPagina = 2,
    VisualizadorModal = false,
  } = props;

  //#region USESTATE
  const [ArrayDocumentos, setArrayDocumentos] = useState<any>([]);
  //#endregion

  //#region VARIABLES
  const DVModal = useModal(false);
  //#endregion

  //#region FUNCIONES
  const CerrarModalDocumentosVisualizador = () => {
    DVModal.closeModal();
  };
  //#endregion

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={SlidesPorPagina}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
      >
        {ListadoImagenes.map((x: any, index: number) => (
          <div key={index}>
            <SwiperSlide key={index} onClick={() => {}}>
              <img
                onClick={() => {
                  if (VisualizadorModal) {
                    setArrayDocumentos([x]);
                    DVModal.openModal();
                  }
                }}
                src={x.base64 ? `data:image/jpeg;base64,${x.base64}` : x.url}
                key={index}
                className="rounded-md w-3/5 object-contain max-h-[33vh] h-auto"
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
      <DocumentosVisualizarModal
        isOpenModal={DVModal.isOpen}
        closeModal={CerrarModalDocumentosVisualizador}
        ArrayDocumentos={ArrayDocumentos}
      />
    </>
  );
};
