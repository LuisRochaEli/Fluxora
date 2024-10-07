import { create } from "zustand";

export interface ISpinLoad {
  CargaGiratoria: boolean;
  CargaGiratoriaTabla: boolean;
  CargaGiratoriaModal: boolean;
  MostrarCarga: () => void;
  OcultarCargar: () => void;
  MostrarCargaTabla: () => void;
  OcultarCargarTabla: () => void;
  MostrarCargaModal: () => void;
  OcultarCargarModal: () => void;
}

export const useSpinLoadStore = create<ISpinLoad>((set) => ({
  CargaGiratoria: false,
  CargaGiratoriaTabla: false,
  CargaGiratoriaModal: false,
  MostrarCarga: () => set({ CargaGiratoria: true }),
  OcultarCargar: () => set({ CargaGiratoria: false }),
  MostrarCargaTabla: () => set({ CargaGiratoriaTabla: true }),
  OcultarCargarTabla: () => set({ CargaGiratoriaTabla: false }),
  MostrarCargaModal: () => set({ CargaGiratoriaModal: true }),
  OcultarCargarModal: () => set({ CargaGiratoriaModal: false }),
}));
