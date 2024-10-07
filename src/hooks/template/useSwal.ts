import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import { useTranslation } from "react-i18next";
import 'animate.css';

export const useSwal = () => {
  const [t] = useTranslation("global");

  const MostrarMensaje = (
    icono: SweetAlertIcon,
    mensaje: string,
    tiempo: number = 2000,
    posicion?: SweetAlertPosition
  ) => {
    Swal.fire({
      toast: true,
      position: posicion ? posicion : "top-end",
      width: 300,
      icon: icono,
      text: mensaje,
      html: `<div style="white-space: pre-line;">${mensaje}</div>`,
      showConfirmButton: false,
      timer: tiempo,
      timerProgressBar: true,
      didOpen: (x) => {
        x.addEventListener("mouseenter", Swal.stopTimer);
        x.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  const MostrarConfirmarCancelar = async (
    titulo: string,
    mensaje: string,
    botonConfirmar: string,
    botonCancelar: string
  ) => {
    let Result;
    await Swal.fire({
      title: titulo,
      html: mensaje,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: botonConfirmar,
      cancelButtonText: botonCancelar,
      background: "#edeff0",
      heightAuto: false,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        Result = true;
      } else {
        if (resultado.dismiss?.toString() === "backdrop") {
          Result = null;
        } else {
          Result = false;
        }
      }
    });
    return Result;
  };

  const MostrarInputTexto = async (
    titulo: string,
    mensaje: string,
    botonConfirmar: string,
    botonCancelar: string,
    valorInput: string,
    lectura?: boolean,
    PlaceholderText?: string
  ) => {
    let Result: boolean | null = false;
    let Comentario = valorInput;
    const inputAttributes: Record<string, string> = lectura
      ? { readonly: "true" }
      : {};
    const { value: text, dismiss: dismiss } = await Swal.fire({
      title: titulo,
      html: mensaje,
      icon: "warning",
      input: "text",
      showCancelButton: true,
      inputPlaceholder: PlaceholderText ? PlaceholderText : t(""),
      inputValue: valorInput,
      inputAttributes: inputAttributes,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: botonConfirmar,
      cancelButtonText: botonCancelar,
      inputValidator: (value: string | null) => {
        if (!value) {
          return t("PleaseWrite");
        } else {
          return null;
        }
      },
    });
    if (text) {
      Result = true;
      Comentario = text.trim();
    }
    if (dismiss?.toString() === "backdrop") {
      Result = null;
    }
    return { Comentario: Comentario, Button: Result };
  };

  return {
    MostrarMensaje,
    MostrarConfirmarCancelar,
    MostrarInputTexto,
  };
};
