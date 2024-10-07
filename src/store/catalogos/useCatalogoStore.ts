import { create } from "zustand";

interface Catalogo {
  ArrayCatalogoEstados: IOpcionesSeleccion[];
  ArrayCatalogoCiudades: IOpcionesSeleccion[];
  ArrayCatalogoColonias: IOpcionesSeleccion[];
  ArrayCatalogoTipoDomicilio: IOpcionesSeleccion[];
  ArrayCatalogoParentescos: IOpcionesSeleccion[];
  ArrayCatalogoAntiguedad: IOpcionesSeleccion[];
  ArrayCatalogoOcupacion: IOpcionesSeleccion[];
  ArrayCatalogoOrigenIngresos: IOpcionesSeleccion[];
  ArrayCatalogoGeneros: IOpcionesSeleccion[];
  setArrayCatalogoEstados: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoCiudades: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoColonias: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoTipoDomicilio: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoParentescos: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoAntiguedad: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoOcupacion: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoOrigenIngresos: (x: IOpcionesSeleccion[]) => void;
  setArrayCatalogoGeneros: (x: IOpcionesSeleccion[]) => void;
}

export const useCatalogoStore = create<Catalogo>((set) => ({
  ArrayCatalogoEstados: [],
  ArrayCatalogoCiudades: [],
  ArrayCatalogoColonias: [],
  ArrayCatalogoTipoDomicilio: [],
  ArrayCatalogoParentescos: [],
  ArrayCatalogoAntiguedad: [],
  ArrayCatalogoOcupacion: [],
  ArrayCatalogoOrigenIngresos: [],
  ArrayCatalogoGeneros: [],
  setArrayCatalogoEstados: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoEstados: state,
    });
  },
  setArrayCatalogoCiudades: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoCiudades: state,
    });
  },
  setArrayCatalogoColonias: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoColonias: state,
    });
  },
  setArrayCatalogoTipoDomicilio: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoTipoDomicilio: state,
    });
  },
  setArrayCatalogoParentescos: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoParentescos: state,
    });
  },
  setArrayCatalogoAntiguedad: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoAntiguedad: state,
    });
  },
  setArrayCatalogoOcupacion: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoOcupacion: state,
    });
  },
  setArrayCatalogoOrigenIngresos: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoOrigenIngresos: state,
    });
  },
  setArrayCatalogoGeneros: (state: IOpcionesSeleccion[]) => {
    set({
      ArrayCatalogoGeneros: state,
    });
  },
}));
