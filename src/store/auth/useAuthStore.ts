import { create } from "zustand";
import { EncriptarValores } from "../../helpers/Crypto";
import { persist } from "zustand/middleware";
import { TOKEN_KEY } from "../../Constants";
interface Auth {
  EstatusAutenticacion: string;
  Usuario: string | null;
  onChecking: () => void;
  onLogin: (state: any) => void;
  onLogout: () => void;
}

export const useAuthStore = create(
  persist<Auth>(
    (set) => ({
      EstatusAutenticacion: EncriptarValores("NOT_AUTHENTICATED"),
      Usuario: null,
      onChecking: () =>
        set({
          EstatusAutenticacion: EncriptarValores("CHECKING"),
        }),
      onLogin: (state: any) =>
        set({
          EstatusAutenticacion: EncriptarValores("AUTHENTICATED"),
          Usuario: EncriptarValores(JSON.stringify(state)),
        }),
      onLogout: () =>
        set({
          EstatusAutenticacion: EncriptarValores("NOT_AUTHENTICATED"),
          Usuario: null,
        }),
    }),
    {
      name: TOKEN_KEY,
    }
  )
);
