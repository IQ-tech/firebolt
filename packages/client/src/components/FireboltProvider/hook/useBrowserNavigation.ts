import { useEffect } from "react";
import { getUrlParams, IFormMetadata, IFormStep, IStepData, IUrlParams, IDefaultStep } from "@iq-firebolt/client-core";
import getDebugStepName from "../../../helpers/getDebugStepName";

/**
 * This hook should contain browser history logic
 * (this logic is only used if FireboltProvider is provided with `withHistory` prop)
 */

interface IBrowserNavigation {
  withHistory?: boolean
  currentStep?: IDefaultStep 
  formflowMetadata?: IFormMetadata
  goPreviousStep?(): void
  goNextStep?: any // TODO: any | { errors: any } - FireboltProvider
  debug?: boolean
  stepQueryParam?: string
}

export default function useBrowserNavigation({
  withHistory,
  currentStep,
  formflowMetadata,
  goPreviousStep,
  goNextStep,
  debug,
  stepQueryParam,
}: IBrowserNavigation) {
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

  function _onPopStateEventHandler(e: any = {}) {
    const previousStep = e?.state?.position;
    const totalSteps = Number(formflowMetadata?.lastStep);
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
    const isDebugging = !!debug && !!getDebugStepName()
    const queryParam = isDebugging ? "debug-step" : stepQueryParam;

    const filteredParamsKeys = Object.keys(currentParams).filter(
      (key: string) => key !== "debug-step" && key !== stepQueryParam
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
