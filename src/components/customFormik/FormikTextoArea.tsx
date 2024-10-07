import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  name: string;
  rows: number;
  placeholder?: string;
  strong?: boolean;
  [x: string]: any;
}

export const FormikTextoArea = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <Container
        className={`col m-0 p-0 input-group relative ${
          meta.touched && meta.error && "has-error"
        }`}
      >
        <span
          className="input-group-text bg-skin-primary/25 border-1 border-r-0 border-skin-primary/75 px-2"
          id="basic-addon1"
        >
          <i
            className={`text-skin-primary text-md ${
              meta.touched && meta.error && "has-error-icon"
            } ${props.icon}`}
          ></i>
        </span>
        <textarea
          className={`relative border-1 border-l-0 border-skin-primary/75 peer !rounded-r-[5px] z-auto ${
            meta.touched && meta.error && "has-error"
          } form-control`}
          placeholder=""
          id={props.name}
          ref={inputRef}
          {...field}
          {...props}
        />
        <div className="absolute z-50 flex right-3 mt-2 w-auto">
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
          className={`absolute left-10 -top-3 px-2 transition-all duration-300 ease-in-out font-bold cursor-text text-sm bg-skin-cardBody text-skin-primary/60 z-[5]
          peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-skin-cardBody peer-placeholder-shown:text-skin-primary/75 peer-placeholder-shown:left-12
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-skin-primary/60`}
          onClick={handleClick}
        >
          {label}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div``;
