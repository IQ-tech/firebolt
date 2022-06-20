import React, { Fragment } from "react";

import useWizard from "./hook";
import { filterChildren } from "./helpers";

import Step from "./Step";
import { IWizardComponent } from "../../types"

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
