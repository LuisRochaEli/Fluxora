import { create } from "zustand";

interface IStoreClienteHomonimos {
  ItemHomonimoSeleccionado: number | null;
  SeleccionarItemHomonimo: (x: number) => void;
  DeseleccionarItemHomonimo: () => void;
}

export const useClienteHomonimosStore = create<IStoreClienteHomonimos>(
  (set) => ({
    ItemHomonimoSeleccionado: null,
    SeleccionarItemHomonimo: (state: number) => {
      set({
        ItemHomonimoSeleccionado: state,
      });
    },
    DeseleccionarItemHomonimo: () => {
      set({
        ItemHomonimoSeleccionado: null,
      });
    },
  })
);
