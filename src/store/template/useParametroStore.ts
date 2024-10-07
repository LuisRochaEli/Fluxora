import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IParametro {
  ConfigParametro: string | null;
  setConfigParametro: (x: string | null) => void;
}

export const useParametroStore = create(
  persist<IParametro>(
    (set) => ({
      ConfigParametro: null,
      setConfigParametro: (state: string | null) =>
        set({
          ConfigParametro: state,
        }),
    }),
    {
      name: "CONFIG_APP",
    }
  )
);
