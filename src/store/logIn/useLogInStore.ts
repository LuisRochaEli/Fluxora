import { create } from "zustand";

interface Menu {
  Usuario: any;
  Token: string;
  EstablecerUsuario: (x: any) => void;
  EstablecerToken: (x: string) => void;
  ResetSession: () => void;
}

export const useLogInStore = create<Menu>((set) => ({
  Usuario: {
    id: 0,
    nombres: "",
    paterno: "",
    materno: "",
    puesto: "",
    departamento: "",
    sucursalId: 0,
    username: "",
    perfil: 0,
  },
  Token: "",
  EstablecerUsuario: (state: any) => {
    set({
      Usuario: state,
    });
  },
  EstablecerToken: (state: string) => {
    set({
      Token: state,
    });
  },
  ResetSession: () => {
    set({
      Token: "",
    });
    set({
      Usuario: {
        id: 0,
        nombres: "",
        paterno: "",
        materno: "",
        puesto: "",
        departamento: "",
        sucursalId: 0,
        username: "",
        perfil: 0,
      },
    });
  },
}));
