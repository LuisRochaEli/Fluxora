export const CampoModoLectura = (props: {
  Label: string;
  Valor: string;
  Icono?: string | null;
  ClassName?: string | null;
  ReactIcon?: JSX.Element | null;
  IsTruncate?: boolean;
}) => {
  const {
    Label,
    Valor,
    Icono,
    ClassName,
    ReactIcon,
    IsTruncate = true,
  } = props;

  return (
    <>
      <div className={ClassName ? ClassName : ""}>
        <label
          className={`${
            ReactIcon && "gap-1"
          } font-bold text-xs text-skin-primary/75 flex items-center`}
        >
          {ReactIcon ? ReactIcon : <i className={`${Icono ? Icono : ""}`}></i>}
          {Label ? Label : ""}
        </label>
        <label
          title={Valor ? Valor : ""}
          className={`p-0 font-base text-sm ml-3 items-start ${
            IsTruncate ? "truncate block" : ""
          }`}
        >
          {Valor ? Valor : ""}
        </label>
      </div>
    </>
  );
};
