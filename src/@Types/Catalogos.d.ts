

interface ICatalogo {
    id: number
    descripcion: string
}

interface IResultadoEPColoniaItem {
    colonia: IColonia
    errors: string| null
    response: string| null
    status: number
}

interface IColonia {
    codigo_postal: number
    descripcion: string
    id: number
    llave_id: number
}

interface ICatalogoOpcionesGenerales {
    idOpcionGeneral: number
    codigoOpcion: string
    opcionGeneral: string
}