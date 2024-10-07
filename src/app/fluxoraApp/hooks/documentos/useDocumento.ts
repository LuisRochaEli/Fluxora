import { useSpinLoadStore } from "../../../../store";
import * as DocumentoServicio from "../../services/documentos/DocumentoServicio";

export const useDocumento = () => {
  const { MostrarCarga, OcultarCargar } = useSpinLoadStore();

  const EstablecerArchivosVisualizarBase64 = async (Documentos: any) => {
    let respuestaS3;
    let DocumentosVisualizar: any = [];
    MostrarCarga();
    await Promise.all(
      Documentos?.map(async (x: any) => {
        try {
          respuestaS3 = await DocumentoServicio.ObtenerImagenBase64(
            x.s3,
            x.extension.toLowerCase()
          );
          DocumentosVisualizar.push({
            base64: respuestaS3.base64,
            orden: parseInt(x.orden),
            extension: x.extension,
            descripcion: x.descripcion,
          });
        } catch (error) {
          try {
            respuestaS3 = await DocumentoServicio.ObtenerImagenBase64(
              x.s3,
              x.extension.toUpperCase()
            );
            DocumentosVisualizar.push({
              base64: respuestaS3.base64,
              orden: parseInt(x.orden),
              extension: x.extension,
              descripcion: x.descripcion,
            });
          } catch (error) {}
        }
      })
    );
    OcultarCargar();
    return DocumentosVisualizar;
  };

  const ObtenerTipoMimePorExtension = (Path: string) => {
    const Extension = Path.split(".").pop()?.toLowerCase();
    switch (Extension) {
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "application/octet-stream"; // Tipo MIME genérico para otros tipos de archivos
    }
  };

  return {
    //Metodos
    EstablecerArchivosVisualizarBase64,
    ObtenerTipoMimePorExtension,
    //Propiedades
  };
};
