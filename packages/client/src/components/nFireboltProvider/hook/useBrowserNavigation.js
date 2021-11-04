import { useEffect } from "react";
import { getUrlParams } from "@iq-firebolt/client-core";

// this hook contains function to treat browser history

export default function useBrowserNavigation({
  withHistory,
  currentStep,
  formflowMetadata,
  goPreviousStep,
  goNextStep,
  debug,
  stepQueryParam,
}) {
  useEffect(() => {
    if (withHistory) {
      setPopStateEvent();
      updateBrowserHistory();
    }
  }, []);

  function setPopStateEvent() {
    // Treat form navigation with browser arrows
    window.onpopstate = _onPopStateEventHandler;
  }

  function _onPopStateEventHandler(e = {}) {
    const previousStep = e?.state?.step;
    const totalSteps = formflowMetadata?.lastStep;
    const currentStepPosition = currentStep?.position;
    const isGoingToPreviousStep =
      !!previousStep && previousStep === currentStepPosition - 1;

    const isGoingToNextStep =
      !!previousStep &&
      previousStep === currentStepPosition + 1 &&
      currentStepPosition + 1 < totalSteps;

    if (isGoingToPreviousStep) {
      goPreviousStep();
    } else if (isGoingToNextStep) {
      goNextStep();
    }
  }

  function updateBrowserHistory() {
    const currentParams = getUrlParams();
    const queryParam = debug ? "debug-step" : stepQueryParam;
    const filteredParamsKeys = Object.keys(currentParams).filter(
      (key) => key !== "debug-step" && key !== stepQueryParam
    );

    const newQuery = filteredParamsKeys.reduce(
      (acc, key) => `${acc}&${key}=${currentParams[key]}`,
      ""
    );

    if (history) {
      history.pushState(
        { step: currentStep.position },
        currentStep.data.friendlyName,
        `?${queryParam}=${currentStep.position}${newQuery}`
      );
    }
  }
}
