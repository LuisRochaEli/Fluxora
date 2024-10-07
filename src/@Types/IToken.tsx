import { IUsuario } from "./IUsuario";

export interface IGuardarToken {
  usuario: IUsuario;
  token: string;
  fechaExpiracion: string;
}
