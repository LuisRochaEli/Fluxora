import { useField } from "formik";
import { useRef } from "react";

interface PropsComponent {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  mask?: any;
  strong?: boolean;
  TextoVerdadero?: string;
  TextoFalso?: string;
  [x: string]: any;
}

export const FormikSwitch = ({
  label,
  TextoVerdadero,
  TextoFalso,
  ...props
}: PropsComponent) => {
  const [field] = useField(props);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="grid grid-flow-row">
        <div className="text-center">
          <label className="font-semibold text-sm">{label}</label>
        </div>
        <div className="flex form-switch gap-x-4 justify-center">
          <div className="text-xs">{TextoFalso ? TextoFalso : "No"}</div>
          <div>
            <input
              className="form-check-input p-2"
              checked={field.value}
              type="checkbox"
              ref={inputRef}
              id={props.name}
              {...field}
              {...props}
            />
          </div>
          <div className="text-xs">
            {TextoVerdadero ? TextoVerdadero : "Si"}
          </div>
        </div>
      </div>
    </>
  );
};
