import { ReactNode } from "react";
import { Modal as ModalReact } from "react-bootstrap";
// import { useTheme } from "../../hooks";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
  size: "sm" | "lg" | "xl" | undefined;
  focus?: boolean;
  dialogClassName?: string;
  fullscreen?: string | true | undefined;
  scrollable?: boolean;
  backdropClassName?: string;
}

export const Modal = ({
  children,
  isOpen,
  closeModal,
  size = "lg",
  focus = true,
  dialogClassName = "",
  fullscreen = "false",
  scrollable = false,
  backdropClassName = "",
}: Props) => {
  // const { companyTheme } = useTheme();

  return (
    <ModalReact
      show={isOpen}
      size={size}
      onHide={() => {
        if (!closeModal) return;
        closeModal();
      }}
      centered
      enforceFocus={focus}
      dialogClassName={`${dialogClassName} theme_Lastrack`}
      fullscreen={fullscreen}
      scrollable={scrollable}
      backdrop={"static"}
      backdropClassName={backdropClassName}
      animation={true}
    >
      {children}
    </ModalReact>
  );
};
