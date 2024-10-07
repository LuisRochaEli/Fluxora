import { create } from "zustand";

interface Menu {
  ColapsoMenu: boolean;
  AlternarMenuResponsivo: boolean;
  TamañoHorizontalPantalla: number;
  setColapsoMenu: (x: boolean) => void;
  setAlternarMenuResponsivo: (x: boolean) => void;
  setTamañoHorizontalPantalla: (x: number) => void;
}

export const useSideMenuStore = create<Menu>((set) => ({
  ColapsoMenu: false,
  AlternarMenuResponsivo: false,
  TamañoHorizontalPantalla: window.innerWidth,
  setColapsoMenu: (state: boolean) =>
    set({
      ColapsoMenu: state,
    }),
  setAlternarMenuResponsivo: (state: boolean) =>
    set({
      AlternarMenuResponsivo: state,
    }),
  setTamañoHorizontalPantalla: (state: number) =>
    set({
      TamañoHorizontalPantalla: state,
    }),
}));
