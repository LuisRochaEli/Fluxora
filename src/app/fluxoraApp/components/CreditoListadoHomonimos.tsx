import { CustomDatatable } from "../../../components/template";
import { useThemes } from "../../../styles/useThemes";
import { FORMATO_FECHA } from "../../../Constants";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useClienteHomonimosStore } from "../store/useClienteHomonimosStore";

export const CreditoListadoHomonimos = (props: {
  ListadoHomonimos: IHomonimo[];
}) => {
  const { ListadoHomonimos } = props;
  //#region HOOKS
  const [t] = useTranslation("global");
  const { TableModal } = useThemes();
  const {
    ItemHomonimoSeleccionado,
    SeleccionarItemHomonimo,
    DeseleccionarItemHomonimo,
  } = useClienteHomonimosStore();
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  const ColumnasTablaHomonimos = [
    {
      name: t("Trays.Select"),
      cell: (row: any) => (
        <>
          <input
            id={row.nip.toString()}
            checked={row.nip === ItemHomonimoSeleccionado ? true : false}
            onChange={() => {
              !ItemHomonimoSeleccionado || row.nip !== ItemHomonimoSeleccionado
                ? SeleccionarItemHomonimo(row.nip)
                : DeseleccionarItemHomonimo();
            }}
            className="form-check-input w-3 h-3 cursor-pointer"
            type="checkbox"
          ></input>
        </>
      ),
      wrap: true,
      center: true,
    },
    {
      name: t("Trays.FullName"),
      selector: (row: IHomonimo) => (
        <div className="text-center">
          {row && row.nombreCompleto ? row.nombreCompleto : ""}
        </div>
      ),
      minWidth: "180px",
      center: 1,
      wrap: 1,
    },
    {
      name: t("Trays.DateOfBirth"),
      selector: (row: IHomonimo) =>
        row && row.fechaNacimiento
          ? format(new Date(row.fechaNacimiento), FORMATO_FECHA.DDMMYYYY)
          : "",
      minWidth: "150px",
      center: 1,
    },
    {
      name: t("Trays.Address"),
      selector: (row: IHomonimo) => (
        <div className="text-center">
          {row
            ? `${row.calle ? row.calle : ""}, ${row.colonia ? row.colonia : ""} ${row.codigoPostal ? row.codigoPostal : ""}, ${row.ciudad ? row.ciudad : ""}`.trim()
            : ""}
        </div>
      ),
      minWidth: "300px",
      center: 1,
      wrap: 1,
    },
    {
      name: t("Trays.NIP"),
      selector: (row: IHomonimo) => (row && row.nip ? row.nip : ""),
      center: 1,
    },
    {
      name: t("Trays.TypeOfAccounts"),
      selector: (row: IHomonimo) => (
        <div className="text-center">
          {row && row.cuentas ? row.cuentas : ""}
        </div>
      ),
      minWidth: "150px",
      center: 1,
      wrap: 1,
    },
  ];
  //#endregion

  //#region FUNCIONES
  window.onbeforeunload = function () {
    return "¿Estás seguro de que quieres salir?";
  };
  //#endregion

  //#region USEEFFECT
  //#endregion

  return (
    <div className="grid grid-cols-1 gap-y-1">
      <div className="text-sm font-semibold text-skin-primary flex items-center gap-1">
        <FaChevronRight />
        {t("Trays.ListOfHomonyms").toUpperCase()}
      </div>
      <CustomDatatable
        InfoData={{
          items:
            ListadoHomonimos && ListadoHomonimos.length > 0
              ? ListadoHomonimos
              : [],
        }}
        Columns={ColumnasTablaHomonimos}
        showExportExcel={false}
        TablesThemes={TableModal}
        showPagination={
          ListadoHomonimos && ListadoHomonimos.length <= 10 ? false : true
        }
      ></CustomDatatable>
    </div>
  );
};
