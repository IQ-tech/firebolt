import { useEffect } from "react";
import { useFirebolt } from "../../hooks/useFirebolt";

export default function useWizard({
  onChangeStep,
  onConnectionError,
  onFinishForm,
  onBeforeChangeStep,
}) {
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
        newStep: stagedStep,
      });
    } else {
      proceedCallback();
    }
  }

  function onStepChangeHandler() {
    const notIsFirstStepRendered = !!lastVisitedStep;
    if (notIsFirstStepRendered && !!onChangeStep) {
      onChangeStep({ completedStep: lastVisitedStep, currentStep });
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
