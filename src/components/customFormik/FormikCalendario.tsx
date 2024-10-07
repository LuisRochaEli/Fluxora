import { ErrorMessage, Field, useField } from "formik";
import { IoMdCalendar } from "react-icons/io";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { PiCalendarFill } from "react-icons/pi";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  strong?: boolean;
  to?: boolean;
  type: string;
  [x: string]: any;
}

export const FormikCalendario = ({ label, to, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div
        className={`col m-0 p-0 input-group relative ${
          meta.touched && meta.error && ""
        }`}
      >
        {to === undefined ? (
          <span
            className="border-1 border-skin-primary/50 bg-skin-primary/25 text-skin-primary font-bold text-sm p-1 rounded-l-md flex items-center"
            id="basic-addon1"
          >
            <IoMdCalendar size={19} />
          </span>
        ) : to ? (
          <span
            className="border-1 border-skin-primary/50 bg-skin-primary/25 text-skin-primary font-bold text-sm p-1 rounded-l-md flex items-center"
            id="basic-addon1"
          >
            <IoCalendarNumberSharp size={16} />
          </span>
        ) : (
          <span
            className="border-1 border-skin-primary/50 bg-skin-primary/25 text-skin-primary font-bold text-sm p-1 rounded-l-md flex items-center"
            id="basic-addon1"
          >
            <PiCalendarFill size={19} />
          </span>
        )}
        <Field
          className="!rounded-r-[5px] z-auto form-control text-xs peer relative border-1 border-l-0 border-skin-primary/50 focus:z-[5]"
          placeholder=" "
          {...field}
          {...props}
        />
        <div className="absolute z-50 flex right-10 mt-1 w-auto">
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
        <label
          className={
            props.disabled
              ? `z-20 absolute left-9 -top-1.5 px-2 transition-all duration-300 ease-in-out font-bold cursor-text bg-gradient-to-b from-white from-45% to-[#E9ECEF] to-55%  text-skin-primary/60 leading-none text-xs`
              : `z-20 absolute left-9 -top-1.5 px-2 transition-all duration-300 ease-in-out font-bold cursor-text bg-skin-cardBody text-skin-primary/60 leading-none text-xs`
          }
        >
          {label}
          {""}
        </label>
      </div>
    </>
  );
};
