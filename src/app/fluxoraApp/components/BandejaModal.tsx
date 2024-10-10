import { useClienteHomonimosStore } from "../store/useClienteHomonimosStore";
import { ESTATUSBANDEJA_VERIFICACIONDATOS } from "../../../Constants";
import { useFechaUtil } from "../../../hooks/template/useFechaUtil";
import { CreditoListadoHomonimos } from "./CreditoListadoHomonimos";
import { useEnrolamiento } from "../hooks/credito/useEnrolamiento";
import { useCatalogo } from "../../../hooks/catalogos/useCatalogo";
import { ValidacionesYupCredito } from "../helpers/validaciones";
import { FaChevronRight, FaEdit, FaSave } from "react-icons/fa";
import { ChangeRegex } from "../../../helpers/FormatosRegex";
import { useSpinLoadStore } from "../../../store";
import { useAuth } from "../hooks/auth/useAuth";
import { useTranslation } from "react-i18next";
import { format, startOfDay } from "date-fns";
import { Formik, FormikProps } from "formik";
import {
  FormikCalendario,
  FormikSeleccion,
  FormikTexto,
} from "../../../components/customFormik";
import { useSwal } from "../../../hooks";
import {
  CustomButtonModal,
  Modal,
  ModalHeader,
  SwiperImagenes,
} from "../../../components/template";
import { useState } from "react";

export const BandejaModal = (props: {
  isOpenModal: boolean;
  closeModal: (x: boolean) => void;
  DataItem: IRegistroConfirmacionDatos | null;
  EstatusProcesoConfirmacionDatos: number | null;
  setEstatusProcesoConfirmacionDatos: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  ListadoHomonimos: IHomonimo[];
  setListadoHomonimos: React.Dispatch<React.SetStateAction<IHomonimo[]>>;
}) => {
  const {
    isOpenModal,
    closeModal,
    DataItem,
    EstatusProcesoConfirmacionDatos,
    setEstatusProcesoConfirmacionDatos,
    ListadoHomonimos,
    setListadoHomonimos,
  } = props;

  //#region HOOKS
  const [t] = useTranslation("global");
  const { ConversionStringToDate, CalcularEdad } = useFechaUtil();
  const { ArrayCatalogoGeneros } = useCatalogo();
  const { MostrarConfirmarCancelar, MostrarMensaje } = useSwal();
  const { EsquemaValidacionCreditoConfirmacionDatos } =
    ValidacionesYupCredito();
  const {
    ObtenerListadoHomonimos,
    InsertarActualizarRelacionEnrolamientoOrigen,
  } = useEnrolamiento();
  const { ItemHomonimoSeleccionado } = useClienteHomonimosStore();
  const { MostrarCarga, OcultarCargar } = useSpinLoadStore();
  const { ObtenerInformacionUsuarioAuth } = useAuth();
  //#endregion

  //#region USESTATE
  const [HabilitarEdicion, setHabilitarEdicion] = useState<boolean>(false);
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  const FuncionalidadCierreModal = async () => {
    await closeModal(false);
    setHabilitarEdicion(false);
  };

  const GuardarConfirmacionDatos = async (values: IFormikConfirmacionDatos) => {
    const Swal = await MostrarConfirmarCancelar(
      "",
      t("Trays.TheInformationWillBeSavedAsShownTheScreen_DoYouWantToContinue?"),
      t("Trays.Accept"),
      t("Trays.Cancel")
    );
    if (Swal) {
      try {
        MostrarCarga();
        const AjaxObj = {
          idOrigen: DataItem && DataItem.idOrigen ? DataItem.idOrigen : null,
          idEnrolamiento:
            values && values.identificador ? values.identificador : null,
          datosConfirmados: true,
          nombre: values.nombre.trim(),
          apellidoPaterno: values.apellidoPaterno.trim(),
          apellidoMaterno: values.apellidoMaterno.trim(),
          fechaNacimiento: ConversionStringToDate(values.fechaNacimiento),
          idGenero: values && values.idGenero ? values.idGenero : null,
        };
        await InsertarActualizarRelacionEnrolamientoOrigen(AjaxObj);
        const CollectionHomonimos = await ObtenerListadoHomonimos({
          nombre: values.nombre.trim(),
          apellidoPaterno: values.apellidoPaterno.trim(),
          apellidoMaterno: values.apellidoMaterno.trim(),
          fechaNacimiento: startOfDay(
            ConversionStringToDate(values.fechaNacimiento)
          ),
        });
        setListadoHomonimos(
          CollectionHomonimos && CollectionHomonimos.length > 0
            ? CollectionHomonimos
            : []
        );
        if (CollectionHomonimos && CollectionHomonimos.length > 0) {
          setEstatusProcesoConfirmacionDatos(
            ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS
          );
        } else {
          await ActualizacionConfirmacionHomonimosAtendidos(
            CollectionHomonimos
          );
          closeModal(true);
        }
      } catch (error) {
        MostrarMensaje(
          "warning",
          t("AnErrorOcurredPleaseContactSystemDepartmant")
        );
      } finally {
        OcultarCargar();
      }
    }
  };

  const ActualizacionConfirmacionHomonimosAtendidos = async (
    CollectionHomonimos: IHomonimo[],
    IdHomonimoSeleccionado?: number | null
  ) => {
    const UsuarioLoggeado = await ObtenerInformacionUsuarioAuth()
    const AjaxObj = {
      idOrigen: DataItem && DataItem.idOrigen ? DataItem.idOrigen : null,
      idEnrolamiento:
        DataItem && DataItem.identificador ? DataItem.identificador : null,
      homonimosAtendidos: true,
      homonimoRelacionado: IdHomonimoSeleccionado,
      cantidadHomonimos: CollectionHomonimos.length,
      idUsuario:
        UsuarioLoggeado && UsuarioLoggeado.id ? UsuarioLoggeado.id : null,
    };
    try {
      MostrarCarga();
      await InsertarActualizarRelacionEnrolamientoOrigen(AjaxObj);
      closeModal(true);
    } catch (error) {
      MostrarMensaje(
        "warning",
        t("AnErrorOcurredPleaseContactSystemDepartmant")
      );
    } finally {
      OcultarCargar();
    }
  };
  //#endregion

  //#region USEEFFECT
  //#endregion

  return (
    <Modal isOpen={isOpenModal} size="xl" focus={true} fullscreen={"md-down"}>
      <ModalHeader
        IconFontello="i-address-card-o"
        Title={
          <>
            {t("Trays.DataConfirmation")}
            {DataItem && DataItem.identificador && DataItem.origen && (
              <span className="text-xs mx-10 block mt-2">
                {`${t("Trays.Identifier").toUpperCase()}:`}
                <span className="font-normal ml-2">{`${DataItem.identificador} - ${DataItem.origen}`}</span>
              </span>
            )}
          </>
        }
        CloseButtonEnabled={
          EstatusProcesoConfirmacionDatos !==
          ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS
        }
        CloseButtonFunctionality={FuncionalidadCierreModal}
      />
      <Formik
        enableReinitialize={true}
        initialValues={{
          identificador:
            DataItem && DataItem.identificador ? DataItem.identificador : null,
          nombre:
            DataItem && DataItem.nombre ? DataItem.nombre.toUpperCase() : "",
          apellidoPaterno:
            DataItem && DataItem.apellidoPaterno
              ? DataItem.apellidoPaterno.toUpperCase()
              : "",
          apellidoMaterno:
            DataItem && DataItem.apellidoMaterno
              ? DataItem.apellidoMaterno.toUpperCase()
              : "",
          fechaNacimiento:
            DataItem && DataItem.fechaNacimiento
              ? format(new Date(DataItem.fechaNacimiento), "yyyy-MM-dd")
              : "",
          idGenero: DataItem && DataItem.idGenero ? DataItem.idGenero : null,
          edad: DataItem && DataItem.edad ? DataItem.edad : "",
          botonPrincipal: false,
        }}
        validationSchema={EsquemaValidacionCreditoConfirmacionDatos}
        onSubmit={(values) => {
          setHabilitarEdicion(false);
          if (values.botonPrincipal) {
            GuardarConfirmacionDatos(values);
          }
        }}
      >
        {(formik: FormikProps<IFormikConfirmacionDatos>) => (
          <>
            <div className="modal-body card-body-modal card m-2 px-3 font-montserrat">
              <div className="lg:mx-2">
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-1">
                  {DataItem &&
                    DataItem.documentosRelacionados &&
                    DataItem.documentosRelacionados.length > 0 && (
                      <>
                        {EstatusProcesoConfirmacionDatos ===
                          ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS && (
                          <div className="col-span-2"></div>
                        )}
                        <div
                          className={`${EstatusProcesoConfirmacionDatos === ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS ? "col-span-4" : "w-auto flex items-center justify-center mr-5 col-span-3"}`}
                        >
                          <SwiperImagenes
                            ListadoImagenes={
                              DataItem && DataItem.documentosRelacionados
                                ? DataItem.documentosRelacionados
                                : []
                            }
                            SlidesPorPagina={1}
                            VisualizadorModal={true}
                          ></SwiperImagenes>
                        </div>
                        {EstatusProcesoConfirmacionDatos ===
                          ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS && (
                          <div className="hidden lg:block col-span-2"></div>
                        )}
                      </>
                    )}
                  <div
                    className={`${
                      EstatusProcesoConfirmacionDatos ===
                      ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS
                        ? `lg:col-span-8 ${
                            DataItem &&
                            DataItem.documentosRelacionados &&
                            DataItem.documentosRelacionados.length > 0
                              ? "mt-8"
                              : "mt-1"
                          }`
                        : `${
                            DataItem &&
                            DataItem.documentosRelacionados &&
                            DataItem.documentosRelacionados.length > 0
                              ? "lg:col-span-5 mt-8 lg:mt-0"
                              : "lg:col-span-8 mt-1 lg:mt-0"
                          }`
                    }`}
                  >
                    {EstatusProcesoConfirmacionDatos ===
                      ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_INFORMACIONCAPTURADA && (
                      <div className="grid grid-cols-1 gap-y-1 mb-3">
                        <div className="text-sm font-semibold text-skin-primary flex items-center gap-1 justify-between mb-2">
                          <div className="flex items-center gap-1">
                            <FaChevronRight />
                            {t(
                              "Trays.VerificationOfCapturedInformation"
                            ).toUpperCase()}
                          </div>
                          <div className="col-span-3 flex justify-end">
                            {HabilitarEdicion ? (
                              <CustomButtonModal
                                FunctionOnClick={() => {
                                  formik.setFieldValue("botonPrincipal", false);
                                  formik.handleSubmit();
                                }}
                                Icon={<FaSave />}
                                Title={t("Trays.Save")}
                              />
                            ) : (
                              <CustomButtonModal
                                FunctionOnClick={() => {
                                  formik.setFieldValue("botonPrincipal", false);
                                  setHabilitarEdicion(true);
                                }}
                                Icon={<FaEdit />}
                                Title={t("Trays.Edit")}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className={`grid grid-cols-1 ${
                            DataItem &&
                            DataItem.documentosRelacionados &&
                            DataItem.documentosRelacionados.length > 0
                              ? "lg:grid-cols-2"
                              : "lg:grid-cols-2 xl:grid-cols-3"
                          } mt-2 gap-3`}
                        >
                          <div>
                            <FormikTexto
                              type="text"
                              label={`${t("Trays.Name(s)")} *`}
                              name={"nombre"}
                              icon={"i-font"}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = ChangeRegex.ChangeToText(
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  "nombre",
                                  value.toUpperCase()
                                );
                              }}
                              disabled={!HabilitarEdicion}
                            />
                          </div>
                          <div>
                            <FormikTexto
                              type="text"
                              label={`${t("Trays.LastName")} *`}
                              name={"apellidoPaterno"}
                              icon={"i-bold"}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = ChangeRegex.ChangeToText(
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  "apellidoPaterno",
                                  value.toUpperCase()
                                );
                              }}
                              disabled={!HabilitarEdicion}
                            />
                          </div>
                          <div>
                            <FormikTexto
                              type="text"
                              label={`${t("Trays.MotherLastName")} *`}
                              name={"apellidoMaterno"}
                              icon={"i-bold"}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = ChangeRegex.ChangeToText(
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  "apellidoMaterno",
                                  value.toUpperCase()
                                );
                              }}
                              disabled={!HabilitarEdicion}
                            />
                          </div>
                          <div>
                            <FormikSeleccion
                              name={"idGenero"}
                              options={ArrayCatalogoGeneros}
                              label={`${t("Trays.Gender")} *`}
                              placeholder={t("Select")}
                              icon={"i-home"}
                              disabled={!HabilitarEdicion}
                            />
                          </div>
                          <div>
                            <FormikCalendario
                              label={`${t("Trays.DateOfBirth")} *`}
                              name="fechaNacimiento"
                              type="date"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                formik.setFieldValue(
                                  "fechaNacimiento",
                                  e.target.value
                                );
                                const FechaNacimiento = ConversionStringToDate(
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  "edad",
                                  FechaNacimiento !== ""
                                    ? CalcularEdad(FechaNacimiento)
                                    : ""
                                );
                              }}
                              disabled={!HabilitarEdicion}
                            />
                          </div>
                          <div>
                            <FormikTexto
                              type="text"
                              label={`${t("Trays.Age")}`}
                              name={"edad"}
                              icon={"i-gift"}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {EstatusProcesoConfirmacionDatos ===
                      ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS && (
                      <CreditoListadoHomonimos
                        ListadoHomonimos={ListadoHomonimos}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {EstatusProcesoConfirmacionDatos ===
                ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_INFORMACIONCAPTURADA && (
                <button
                  type="button"
                  className={`btn btn-danger `}
                  onClick={() => {
                    formik.setFieldValue("botonPrincipal", true);
                    formik.handleSubmit();
                  }}
                >
                  <i className="i-paper-plane text-sm mr-1"></i>
                  {t("Trays.CorrectInformation")}
                </button>
              )}
              {EstatusProcesoConfirmacionDatos ===
                ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS && (
                <button
                  type="button"
                  className={`btn btn-danger`}
                  onClick={() => 
                    // console.log(ListadoHomonimos, ItemHomonimoSeleccionado)
                    ActualizacionConfirmacionHomonimosAtendidos(
                      ListadoHomonimos,
                      ItemHomonimoSeleccionado
                    )
                  }
                >
                  <i className="i-users text-sm mr-1"></i>
                  {t("Trays.HomonymsServed")}
                </button>
              )}
              {EstatusProcesoConfirmacionDatos !==
                ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS && (
                <button
                  onClick={FuncionalidadCierreModal}
                  className={`btn btn-outline-secondary `}
                >
                  <i className="i-cancel"></i>
                  {`${t("Close")}`}
                </button>
              )}
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
};
