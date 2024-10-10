import {
  FormikCalendario,
  FormikSeleccion,
} from "../../../../components/customFormik";
import { useFechaUtil } from "../../../../hooks/template/useFechaUtil";
import { useEnrolamiento } from "../../hooks/credito/useEnrolamiento";
import { useCatalogo } from "../../../../hooks/catalogos/useCatalogo";
import { useDocumento } from "../../hooks/documentos/useDocumento";
import { CustomDatatable } from "../../../../components/template";
import { useModal, useSwal, useTitulo } from "../../../../hooks";
import { BandejaModal } from "../../components/BandejaModal";
import { useThemes } from "../../../../styles/useThemes";
import { useSpinLoadStore } from "../../../../store";
import { CgEditBlackPoint } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { format, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Formik } from "formik";
import {
  ESTATUSBANDEJA_VERIFICACIONDATOS,
  FORMATO_FECHA,
} from "../../../../Constants";

export const BandejaConfirmacionDatos = () => {
  //#region HOOKS
  const [t, i18n] = useTranslation("global");
  const { ActualizarTituloNavBar } = useTitulo();
  const { WithoutHeaderPaginationOut } = useThemes();
  const { CargaGiratoriaTabla, MostrarCargaTabla, OcultarCargarTabla } =
    useSpinLoadStore();
  const { ConversionStringToDate, CalcularEdad } = useFechaUtil();
  const { ConsultarCatalogoGeneros } = useCatalogo();
  const {
    ObtenerListadoEnrolamientoConfirmacionDatos,
    ObtenerListadoHomonimos,
  } = useEnrolamiento();
  const { MostrarMensaje } = useSwal();
  const { EstablecerArchivosVisualizarBase64 } = useDocumento();
  //#endregion

  //#region USESTATE
  const [Filtros, setFiltros] = useState<IDtoFiltrosBandejaConfirmacionDatos>({
    fechaAltaFrom: subWeeks(new Date(), 1).toISOString(),
    fechaAltaTo: new Date().toISOString(),
    enrolamientoCompleto: false,
  });
  const [InfoData, setInfoData] = useState<{
    items: IRegistroConfirmacionDatos[] | [];
  }>({
    items: [],
  });
  const [ItemRegistroPorConfirmar, setItemRegistroPorConfirmar] =
    useState<IRegistroConfirmacionDatos | null>(null);
  const [EstatusProcesoConfirmacionDatos, setEstatusProcesoConfirmacionDatos] =
    useState<number | null>(null);
  const [ListadoHomonimos, setListadoHomonimos] = useState<IHomonimo[]>([]);
  //#endregion

  //#region VARIABLES
  const BModal = useModal(false);
  const Columnas = [
    {
      name: t("Trays.Origin"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.origen ? row.origen.toUpperCase() : "",
      center: 1,
      wrap: true,
    },
    {
      name: t("Trays.Identifier"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.identificador ? row.identificador : "",
      center: 1,
    },
    {
      name: t("Trays.Name"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.nombre ? row.nombre : "",
      center: 1,
    },
    {
      name: t("Trays.LastNames"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.apellidos ? row.apellidos : "",
      center: 1,
    },
    {
      name: t("Trays.DateOfBirth"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.fechaNacimiento
          ? format(new Date(row.fechaNacimiento), FORMATO_FECHA.DDMMYYYY)
          : "",
      center: 1,
    },
    {
      name: t("Trays.CorrectData"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.datosConfirmados ? (
          <div className="flex gap-x-0.5 font-semibold text-green-700">
            <CgEditBlackPoint className="rounded-full" size={15} />
            {t("Trays.Yes")}
          </div>
        ) : (
          <div className="flex gap-x-0.5 font-semibold text-red-700">
            <CgEditBlackPoint className="rounded-full" size={15} />
            {t("Trays.No")}
          </div>
        ),
      center: 1,
    },
    {
      name: t("Trays.HomonymsServed"),
      selector: (row: IRegistroConfirmacionDatos) =>
        row && row.homonimosAtendidos ? (
          <div className="flex gap-x-0.5 font-semibold text-green-700">
            <CgEditBlackPoint className="rounded-full" size={15} />
            {t("Trays.Yes")}
          </div>
        ) : (
          <div className="flex gap-x-0.5 font-semibold text-red-700">
            <CgEditBlackPoint className="rounded-full" size={15} />
            {t("Trays.No")}
          </div>
        ),
      center: 1,
    },
  ];
  //#endregion

  //#region FUNCIONES
  const VisualizarDetallesRegistro = async (
    row: IRegistroConfirmacionDatos
  ) => {
    row = {
      ...row,
      edad: CalcularEdad(row.fechaNacimiento),
      documentosRelacionados:
        row && row.documentosRelacionadosString
          ? JSON.parse(row.documentosRelacionadosString)
          : [],
    };
    const DocumentosRelacionadosURLBase64 =
      await EstablecerArchivosVisualizarBase64(row.documentosRelacionados);
    row.documentosRelacionados = DocumentosRelacionadosURLBase64.sort(
      (a: any, b: any) => a.orden - b.orden
    );
    if (!row.homonimosAtendidos || !row.datosConfirmados) {
      let EstatusConfirmacionDatos =
        row && row.datosConfirmados
          ? ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS
          : ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_INFORMACIONCAPTURADA;
      if (
        EstatusConfirmacionDatos ===
        ESTATUSBANDEJA_VERIFICACIONDATOS.VERIFICACION_HOMONIMOS
      ) {
        const CollectionHomonimos = await ObtenerListadoHomonimos({
          nombre: row.nombre.trim(),
          apellidoPaterno: row.apellidoPaterno.trim(),
          apellidoMaterno: row.apellidoMaterno.trim(),
          fechaNacimiento:
            row && row.fechaNacimiento ? row.fechaNacimiento : null,
        });
        setListadoHomonimos(
          CollectionHomonimos && CollectionHomonimos.length > 0
            ? CollectionHomonimos
            : []
        );
      }
      setEstatusProcesoConfirmacionDatos(EstatusConfirmacionDatos);
      setItemRegistroPorConfirmar(row);
      BModal.openModal();
    } else {
      MostrarMensaje("warning", t("Trays.EnrollmentHasAlreadyBeenTakenCareOf"));
    }
  };

  const CerrarModalBandeja = async (Fill: boolean) => {
    if (Fill) FillDatatable(Filtros);
    await BModal.closeModal();
    setItemRegistroPorConfirmar(null);
  };

  const FillDatatable = async (
    Filtros: IDtoFiltrosBandejaConfirmacionDatos
  ) => {
    MostrarCargaTabla();
    try {
      let respuestaCollection: IRegistroConfirmacionDatos[] =
        await ObtenerListadoEnrolamientoConfirmacionDatos(Filtros);
      setInfoData({
        items: respuestaCollection
          ? respuestaCollection.length > 0
            ? respuestaCollection
            : []
          : [],
      });
    } catch (error) {
      setInfoData({ items: [] });
    } finally {
      OcultarCargarTabla();
    }
  };
  //#endregion

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      ActualizarTituloNavBar(t("Trays.DataConfirmationTray"));
      await ConsultarCatalogoGeneros();
    })();
  }, [i18n.language]);

  useEffect(() => {
    (async () => {
      await FillDatatable(Filtros);
    })();
  }, [Filtros]);
  //#endregion

  return (
    <>
      <section className="sm:mx-0 lg:mx-8 px-10 py-2 grid gap-y-8 mb-24 lg:mb-10 mt-3">
        <div className="card cardBody">
          <div className="card-body">
            <Formik
              enableReinitialize={true}
              initialValues={{
                fechaAltaFrom: Filtros
                  ? Filtros.fechaAltaFrom
                    ? format(Filtros.fechaAltaFrom, "yyyy-MM-dd")
                    : format(subWeeks(new Date(), 1), "yyyy-MM-dd")
                  : format(subWeeks(new Date(), 1), "yyyy-MM-dd"),
                fechaAltaTo: Filtros
                  ? Filtros.fechaAltaTo
                    ? format(Filtros.fechaAltaTo, "yyyy-MM-dd")
                    : format(new Date(), "yyyy-MM-dd")
                  : format(new Date(), "yyyy-MM-dd"),
                enrolamientoCompleto: Filtros.enrolamientoCompleto ? "1" : "0",
              }}
              onSubmit={async (values) => {
                setFiltros({
                  fechaAltaFrom: ConversionStringToDate(values.fechaAltaFrom),
                  fechaAltaTo: ConversionStringToDate(values.fechaAltaTo),
                  enrolamientoCompleto:
                    values.enrolamientoCompleto === "1" ? true : false,
                });
              }}
            >
              {(formik) => (
                <>
                  <div className="grid grid-grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <div>
                      <FormikCalendario
                        label={`${t("Trays.StartDate")}`}
                        name="fechaAltaFrom"
                        type="date"
                        to={false}
                      />
                    </div>
                    <div>
                      <FormikCalendario
                        label={`${t("Trays.EndDate")}`}
                        name="fechaAltaTo"
                        type="date"
                        to={true}
                      />
                    </div>
                    <div>
                      <FormikSeleccion
                        name={"enrolamientoCompleto"}
                        options={[
                          { label: t("Trays.FullEnrollment"), value: "1" },
                          {
                            label: t("Trays.EnrollmentToBeConfirmed"),
                            value: "0",
                          },
                        ]}
                        label={`${t("Trays.EnrollmentStatus")}`}
                        placeholder={t("Select")}
                        icon={"i-flag-checkered"}
                        isClearable={false}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="btn-tw-third rounded-lg text-xs w-3/4 font-medium"
                        onClick={() => formik.handleSubmit()}
                        type="button"
                      >
                        <i className="i-search m-1"></i>
                        {t("Trays.Search")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
        <div className="card cardBody px-4">
          {CargaGiratoriaTabla ? (
            <>
              <div className="flex justify-center">
                <Spinner
                  animation="grow"
                  style={{ width: "6rem", height: "6rem" }}
                  variant="primary"
                />
              </div>
            </>
          ) : (
            <>
              <CustomDatatable
                InfoData={InfoData}
                Columns={Columnas}
                showExportExcel={false}
                TablesThemes={WithoutHeaderPaginationOut}
                handleRowDoubledClick={VisualizarDetallesRegistro}
              ></CustomDatatable>
            </>
          )}
        </div>
      </section>
      <BandejaModal
        isOpenModal={BModal.isOpen}
        closeModal={CerrarModalBandeja}
        DataItem={ItemRegistroPorConfirmar}
        EstatusProcesoConfirmacionDatos={EstatusProcesoConfirmacionDatos}
        setEstatusProcesoConfirmacionDatos={setEstatusProcesoConfirmacionDatos}
        setListadoHomonimos={setListadoHomonimos}
        ListadoHomonimos={ListadoHomonimos}
      />
    </>
  );
};
