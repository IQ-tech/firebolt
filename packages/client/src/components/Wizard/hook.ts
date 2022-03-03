import { object } from "prop-types";
import { useEffect } from "react";
import { useFirebolt } from "../../hooks/useFirebolt";

interface IUseWizard {  // TODO: any
  onChangeStep?(arg0: object): void
  onConnectionError?(arg0?: object): void
  onFinishForm?(arg0: object): void
  onBeforeChangeStep?: any
}

export default function useWizard({
  onChangeStep,
  onConnectionError,
  onFinishForm,
  onBeforeChangeStep,
}: IUseWizard) { // TODO: any
  const {
    isFormLoading,
    currentStep,
    lastVisitedStep,
    formFlowHasBeenFinished,
    formEndPayload,
    stagedStep,
    commitStepChange,

    connectionError,
  } = useFirebolt(); 

  useEffect(onStepChangeHandler, [currentStep]);

  useEffect(() => {
    if (!!stagedStep) onBeforeStepChangeHandler();
  }, [stagedStep]);

  useEffect(onConnectionErrorHandler, [connectionError]);
  useEffect(onFormFinishedCallback, [formFlowHasBeenFinished]);

  function onConnectionErrorHandler() {
    if (connectionError && !!onConnectionError) {
      onConnectionError();
    }
  }

  function onBeforeStepChangeHandler() {
    const proceedCallback = () => commitStepChange();

    if (!!onBeforeChangeStep) {
      onBeforeChangeStep(proceedCallback, {
        leavingStep: currentStep,
        enteringStep: stagedStep,
      });
    } else {
      proceedCallback();
    }
  }

  function onStepChangeHandler() {
    const notIsFirstStepRendered = !!lastVisitedStep?.position;
    if (notIsFirstStepRendered && !!onChangeStep) {
      onChangeStep({ sentStep: lastVisitedStep, currentStep });
    }
  }

  function onFormFinishedCallback() {
    if (!!formFlowHasBeenFinished && !!onFinishForm) {
      const payload = formEndPayload || {};
      onFinishForm(payload);
    }
  }

  return {
    isFormLoading,
    currentStepSlug: currentStep?.data?.slug,
  };
}
