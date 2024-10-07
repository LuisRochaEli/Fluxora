import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EncriptarValores } from "../../helpers/Crypto";
import { AMBIENTES } from "../../Constants";

interface IAmbiente {
  Ambiente: string;
  setAmbiente: (x: string) => void;
}

export const useAmbienteStore = create(
  persist<IAmbiente>(
    (set) => ({
      Ambiente: EncriptarValores(AMBIENTES.PRODUCCION),
      setAmbiente: (state: string) =>
        set({
          Ambiente: state,
        }),
    }),
    {
      name: "AMBIENTE_APP",
    }
  )
);
