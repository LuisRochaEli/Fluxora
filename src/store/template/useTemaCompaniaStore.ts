import { create } from "zustand";

interface ITema {
  TemaCompania: string;
  setTemaCompania: (x: string) => void;
}

export const useTemaCompaniaStore = create<ITema>((set) => ({
  TemaCompania: "",
  setTemaCompania: (state: string) =>
    set({
      TemaCompania: state,
    }),
}));
