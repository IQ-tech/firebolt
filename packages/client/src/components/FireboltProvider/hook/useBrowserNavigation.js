import { useEffect } from "react";
import { getUrlParams } from "@iq-firebolt/client-core";

/**
 * This hook should contain browser history logic
 * (this logic is only used if FireboltProvider is provided with `withHistory` prop)
 */

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
    if (withHistory && !!currentStep.data.slug) {
      setPopStateEvent();
      updateBrowserHistory();
    }
  }, [currentStep]);

  function setPopStateEvent() {
    // Treat form navigation with browser arrows
    window.onpopstate = _onPopStateEventHandler;
  }

  function _onPopStateEventHandler(e = {}) {
    const previousStep = e?.state?.position;
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
        { slug: currentStep.data.slug, position: currentStep.position },
        currentStep.data.friendlyName,
        `?${queryParam}=${currentStep.data.slug}${newQuery}`
      );
    }
  }
}
