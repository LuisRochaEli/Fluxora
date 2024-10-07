interface IStepperComponent {
  numeroPaso: number;
  nombrePaso: string | null;
}

interface IOpcionesSeleccion {
  label: string;
  value: string | number | null;
  name?: string;
  labelExtra?: string
}

interface IModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface ISideBarMenu {
  id: number;
  textoMenu: string;
  ruta?: string | null;
  icono: JSX.Element;
  subMenu: ISideBarMenu[];
  idMenuPadre: number | null;
}
