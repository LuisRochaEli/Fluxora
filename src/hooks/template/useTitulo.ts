import { useTituloStore } from "../../store";
export const useTitulo = () => {
  const { NombreTitulo, setNombreTitulo } = useTituloStore();

  const ActualizarTituloNavBar = async (Titulo: string) => {
    setNombreTitulo(Titulo);
  };

  return {
    //Propiedades
    NombreTitulo,
    //Metodos
    ActualizarTituloNavBar,
  };
};
