import { useTranslation } from "react-i18next";
import { FaCircle } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import styled from "styled-components";
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";

interface PropsCustomStepper {
  ArrayStepper: IStepperComponent[];
  ActiveStep: number;
}

export const CustomStepper = (props: PropsCustomStepper) => {
  const { ArrayStepper, ActiveStep } = props;
  //#region HOOKS
  const [t] = useTranslation("global");
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  // //#endregion

  // //#region USEEFFECT
  //#endregion
  return (
    <div className="flex justify-center">
      <Stepper
        alternativeLabel
        activeStep={ActiveStep}
        connector={<ColorlibConnector />}
        className="w-full md:w-[80%] lg:w-[60%]"
      >
        {ArrayStepper.map((x: IStepperComponent, index: number) => (
          <Step key={index}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <div className="grid grid-cols-1">
                <label className="text-[8px] text-gray-700/80">{`${t(
                  "Step"
                ).toUpperCase()} ${x.numeroPaso}`}</label>
                <label className="text-[10px] font-semibold">
                  {t(x ? (x.nombrePaso ? x.nombrePaso : "") : "")}
                </label>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "rgb(177 17 22 / 0.7)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "rgb(177 17 22 / 0.7)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "rgb(177 17 22 / 0.3)",
    borderRadius: 1,
    marginRight: "10px",
    marginLeft: "10px",
  },
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;
  //#region HOOKS
  //#endregion

  //#region USESTATE
  //#endregion

  //#region VARIABLES
  //#endregion

  //#region FUNCIONES
  // //#endregion

  // //#region USEEFFECT
  //#endregion
  return (
    <>
      {completed && (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-white border-skin-primary/80 bg-skin-primary/80">
            <IoMdCheckmark className="text-4xl" />
          </div>
        </>
      )}
      {active && (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 text-skin-primary/80 border-skin-primary/80">
            <FaCircle className="text-5xl p-1" />
          </div>
        </>
      )}
      {!active && !completed && (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-skin-primary/30 bg-skin-primary/30"></div>
        </>
      )}
    </>
  );
};
