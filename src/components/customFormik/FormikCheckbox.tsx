import { useField, ErrorMessage } from "formik";
import styled from "styled-components";

interface Props {
  label: string;
  name: string;
  [x: string]: any;
}

export const FormikCheckbox = ({ label, ...props }: Props) => {
  const [field, _meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <div className="grid mx-2">
        <div className="flex items-center">
          <CheckboxContainer
            {...field}
            {...props}
            className="flex justify-center items-center"
          >
            <CheckboxInput type="checkbox" {...field} {...props} />
            <span className="font-semibold text-[11px] cursor-pointer justify-center text-black/70">
              {label}
            </span>
          </CheckboxContainer>
          <ErrorMessage
            name={props.name}
            component="span"
            className="custom-span-error-class"
          />
        </div>
      </div>
    </>
  );
};

const CheckboxContainer = styled.label`
  padding: 2px;
  border-radius: ${({ checked }: any) => (checked ? `5%` : `0%`)};
  border: ${({ checked, color }: any) =>
    checked ? `6px outset ${color}` : `none`};
`;

const CheckboxInput = styled.input`
  appearance: none;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  color: #fff;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  width: 20px;
  height: 20px;
  min-height: 20px;
  min-width: 20px;
  appearance: none;
  border: 2px solid rgba(var(--color-primary), 0.8);
  border-radius: 45%;
  background-position: 0 -2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  transition: all 0.5s ease-in-out;
  &:checked {
    background-color: rgba(var(--color-primary), 0.5);
    color: rgba(var(--color-primary), 1);
    background-position: 0 0;
  }

  &:focus {
    border-color: rgba(var(--color-primary), 1);
  }

  &:disabled {
    background-color: rgb(198, 198, 198);
    background-image: none;
    &:checked {
      background-color: rgb(198, 198, 198);
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
  }
`;
