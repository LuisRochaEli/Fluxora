import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import MaskedInput from "react-text-mask";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  mask?: any;
  strong?: boolean;
  [x: string]: any;
}

export const FormikTelefono = ({
  label,
  reactIcon,
  margin = true,
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };
  return (
    <>
      <div
        className={`col m-0 p-0 input-group relative ${
          meta.touched && meta.error && ""
        }`}
      >
        <span
          className="border-1 border-skin-primary/50 bg-skin-primary/25 text-skin-primary font-bold text-sm p-1 rounded-l-md"
          id="basic-addon1"
        >
          {reactIcon ? (
            <></>
          ) : (
            <>
              <i
                className={`${
                  meta.touched && meta.error && "has-error-icon animate-pulse"
                } ${props.icon}`}
              ></i>{" "}
            </>
          )}
        </span>
        <MaskedInput
          className={`peer form-control text-xs !rounded-r-[5px] z-auto ${
            meta.touched && meta.error && "bg-skin-cardBody"
          }  border-1 border-skin-primary/50 border-l-0 appearance-none`}
          autoComplete="off"
          mask={props.mask}
          guide={false}
          {...field}
          {...props}
        />{" "}
        <div className="absolute z-50 flex right-3 mt-1 w-auto">
          <ErrorMessage
            name={props.name}
            render={(msg) => (
              <div className="tooltip-container ">
                <i className="i-warning text-danger animate-ping"></i>
                <div className="tooltip">{msg}</div>
              </div>
            )}
            className="i-warning text-danger "
          />
        </div>{" "}
        <div
          className={
            props.disabled
              ? `absolute left-9 -top-2 px-2 transition-all duration-300 ease-in-out font-bold cursor-text text-skin-primary/60 z-[5] peer/label w-fit text-xs md:text-xs peer-placeholder-shown:truncate peer-placeholder-shown:w-auto peer-placeholder-shown:bg-gradient-to-b from-white from-45% to-[#E9ECEF] to-55%`
              : `absolute left-9 -top-2 px-2 transition-all duration-300 ease-in-out font-bold cursor-text bg-skin-cardBody text-skin-primary/60 z-[5] peer/label w-fit text-xs md:text-xs
          peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-xs md:peer-placeholder-shown:text-xs  peer-placeholder-shown:scale-100 peer-placeholder-shown:truncate peer-placeholder-shown:w-auto peer-placeholder-shown:bg-skin-cardBody peer-placeholder-shown:text-skin-primary/75
          peer-focus:-top-2 peer-focus:text-xs md:peer-focus:text-xs peer-focus:text-skin-primary/60 disabled:bg-gradient-to-b from-white from-45% to-[#E9ECEF] to-55% `
          }
          onClick={handleClick}
        >
          {label}
        </div>
      </div>
    </>
  );
};
