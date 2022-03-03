import React, { Fragment } from "react";

import useWizard from "./hook";
import { filterChildren } from "./helpers";
import { IStepProps } from "./hook"
import Step from "./Step";

interface IWizardComponent {
  children: React.ReactElement
  fallback?: React.ReactElement
  onChangeStep?(arg0: IStepProps): void
  onConnectionError?(arg0?: object): void
  onFinishForm?(arg0?: object): void
  onBeforeChangeStep?(arg0?: Function, arg1?: IStepProps): void
}

const Wizard = ({
  children,
  fallback,
  onChangeStep,
  onConnectionError,
  onFinishForm,
  onBeforeChangeStep,
}: IWizardComponent) => {
  const { isFormLoading, currentStepSlug } = useWizard({
    onChangeStep,
    onConnectionError,
    onFinishForm,
    onBeforeChangeStep,
  });

  return (
    <Fragment>
      {isFormLoading
        ? !!fallback
          ? fallback
          : null
        : filterChildren(children, currentStepSlug)}
    </Fragment>
  );
};

Wizard.Step = Step;

export default Wizard;
