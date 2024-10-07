import { ErrorMessage, Field, useField } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { APLICACION_MOVIL } from "../../Constants";

interface OptionType {
  label: string;
  value: string;
}

export const FormikSeleccion = (props: any) => {
  const {
    name,
    icon,
    options,
    placeholder,
    isMulti,
    reactIcon,
    label,
    isAutocomplete,
    onChangeBefore,
    disabled,
    isClearable,
    isSearchable
  } = props;
  const [_field, meta] = useField(props);
  return (
    <>
      <div
        className={`col m-0 p-0 input-group relative ${
          meta.touched && meta.error && ""
        }`}
      >
        <span
          className="border-1 border-skin-primary/50 bg-skin-primary/25 text-skin-primary z-20 font-bold text-sm p-1 rounded-l-md"
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
        <Field
          className={"border-none"}
          name={name}
          icon={icon}
          options={options}
          component={CustomSelect}
          placeholder={placeholder}
          isMulti={isMulti}
          isAutocomplete={isAutocomplete}
          onChangeBefore={onChangeBefore}
          disabled={disabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
        />{" "}
        <label
          className={
            disabled
              ? `absolute left-9 -top-1.5 px-2 transition-all duration-300 ease-in-out font-bold cursor-text bg-gradient-to-b from-white from-45% to-[#E9ECEF] to-55%  text-skin-primary/60 leading-none text-xs`
              : `absolute left-9 -top-1.5 px-2 transition-all duration-300 ease-in-out font-bold cursor-text bg-skin-cardBody text-skin-primary/60 leading-none text-xs`
          }
        >
          {label}
        </label>
        <div className="absolute z-50 flex right-7 mt-0.5 w-auto">
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
        </div>
      </div>
    </>
  );
};

const CustomSelect = (props: any) => {
  const {
    placeholder,
    options,
    isMulti,
    isAutocomplete,
    onChangeBefore,
    disabled,
    isClearable = true,
    isSearchable = APLICACION_MOVIL ? false : true
  } = props;
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  // const [meta] = useField(props);
  const [t] = useTranslation("global");
  const [Selected, setSelected] = useState<any>(null);
  const [Hover, setHover] = useState<any>(null);
  const [Multi, setMulti] = useState<any>(null);
  const AnimatedComponents = makeAnimated();
  const [ValueDefault, setValueDefault] = useState(null);
  const [ArrayOptions, setArrayOptions] = useState([]);
  const [_InputValue, setInputValue] = useState("");
  const [OptionsAutocomplete, setOptionsAutocomplete] = useState([]);
  const [_menuIsOpen, setMenuIsOpen] = useState(false);

  //#region USEEFFECT
  useEffect(() => {
    (async () => {
      const themeContainer = document.getElementById("theme-container");
      if (themeContainer) {
        setSelected(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.7)`
        );
        setHover(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.2)`
        );
        setMulti(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.15)`
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isMulti) {
        setValueDefault(state.value);
      } else {
        if (isAutocomplete) {
          setValueDefault(
            options?.find((x: OptionType) => x.value == state.value)
              ? options?.find((x: OptionType) => x.value == state.value)
              : null
          );
        } else {
          setValueDefault(
            options?.find((x: OptionType) => x.value == state.value)
              ? options?.find((x: OptionType) => x.value == state.value)
              : null
          );
        }
      }
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      setArrayOptions(options ? options : []);
      if (isAutocomplete) {
        setOptionsAutocomplete(options.slice(0, 20));
      }
    })();
  }, [options]);
  //#endregion USEEFFECT

  const onChange = (value: any) => {
    let NewValue = null;
    setTouched(true)
    if (isAutocomplete) {
      NewValue = value ? (value.value ? value.value : null) : null;
      if (onChangeBefore) {
        onChangeBefore(NewValue);
      }
    } else {
      if (isMulti) {
        NewValue = value.map(function (e: any) {
          return e;
        });
      } else {
        NewValue = value ? (value.value ? value.value : null) : null;
        if (onChangeBefore) {
          onChangeBefore(NewValue);
        }
      }
    }
    setValue(NewValue);
  };

  const CustomNoOptionsMessage = () => {
    return t("NotFindOption");
  };

  const handleInputChange = (inputValue: any) => {
    setInputValue(inputValue);
    if (inputValue.length >= 5) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
    if (isAutocomplete) {
      if (inputValue.trim === "") {
        setOptionsAutocomplete(options.slice(0, 20)); // Limitar a 50 opciones
      } else {
        const hola = options
          .filter((option: any) => {
            const Option = option.label
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f\s,]/g, "");
            const Input = inputValue
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f\s,]/g, "");
            return Option.includes(Input);
          })
          .slice(0, 20); // Limitar a 50 opciones
        setOptionsAutocomplete(hola);
      }
    }
  };

  const filtroPersonalizado = (option: any, inputValue: any) => {
    const option2 = option.label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\s,]/g, "");
    const Input = inputValue
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\s,]/g, "");
    return option2.includes(Input);
  };

  return (
    <>
      {!isAutocomplete ? (
        <>
          <Select
            isDisabled={disabled}
            className="form-control border-l-0 border-skin-primary/60 customSelect p-0 focus:border-none !rounded-r-[5px] z-auto text-xs"
            value={ValueDefault}
            onChange={onChange}
            noOptionsMessage={CustomNoOptionsMessage}
            isSearchable={isSearchable}
            isClearable={isClearable}
            placeholder={placeholder}
            name={field.name}
            options={ArrayOptions}
            components={AnimatedComponents}
            isMulti={isMulti}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                neutral10: Multi,
                primary50: Hover,
                primary25: Hover,
                primary: Selected,
              },
              control: (state: any) =>
                state.isFocused ? "bg-red-600" : "bg-green-300",
            })}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </>
      ) : (
        <>
          <Select
            isDisabled={disabled}
            onInputChange={handleInputChange}
            className="form-control border-l-0 border-skin-primary/60 customSelect p-0 focus:border-none !rounded-r-[5px] z-auto"
            value={ValueDefault}
            onChange={onChange}
            noOptionsMessage={CustomNoOptionsMessage}
            isSearchable={false}
            isClearable={true}
            placeholder={placeholder}
            name={field.name}
            options={OptionsAutocomplete}
            filterOption={(option, inputValue) =>
              filtroPersonalizado(option, inputValue)
            }
            isMulti={isMulti}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                neutral10: Multi,
                primary50: Hover,
                primary25: Hover,
                primary: Selected,
              },

              control: (state: any) =>
                state.isDisabled ? "bg-red-600" : "bg-green-300",
              // state.isDisabled ? "bg-red-500" :"bg-green-400",
            })}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </>
      )}
    </>
  );
};
