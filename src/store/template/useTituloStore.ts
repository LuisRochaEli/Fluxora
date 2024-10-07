import { create } from "zustand";

interface ITitulo {
  NombreTitulo: string | null;
  setNombreTitulo: (x: string | null) => void;
}

export const useTituloStore = create<ITitulo>((set) => ({
  NombreTitulo: "",
  setNombreTitulo: (state: string | null) =>
    set({
      NombreTitulo: state,
    }),
}));
