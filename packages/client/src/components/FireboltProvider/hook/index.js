import { useRef, useEffect } from "react";
import { createFireboltForm } from "@iq-firebolt/client-core";

import useStates from "./useStates";
import useData from "./useData";
import useBrowserNavigation from "./useBrowserNavigation";

function useFireboltProvider({
  formAccess,
  debug,
  requestsMetadata = {},
  theme,
  withHistory,
  stepQueryParam = "step",
}) {
  const formEngine = useRef(
    createFireboltForm(formAccess, { requestsMetadata, debug })
  );

  const {
    isFormLoading,
    setIsFormLoading,
    formFlowHasBeenFinished,
    setFormFlowHasBeenFinished,
  } = useStates();

  const {
    capturedData,
    setCapturedData,
    remoteValidationErrors,
    setRemoteValidationErrors,
    formflowMetadata,
    setFormFlowMetadata,
    formEndPayload,
    setFormEndPayload,
    currentStep,
    setCurrentStep,
    stagedStep,
    setStagedStep,
    lastVisitedStep,
    setLastVisitedStep,
  } = useData();

  useBrowserNavigation({
    withHistory,
    currentStep,
    formflowMetadata,
    goPreviousStep,
    goNextStep,
    stepQueryParam,
    debug,
  });

  useEffect(() => {
    const debugStep = debug ? _getDebugStep() : false;
    if (!debugStep) {
      _startForm();
    } else {
      _startDebugStep(debugStep);
    }
  }, []);

  function _getDebugStep() {
    const params = new URLSearchParams(window.location.search);
    const stepToDebug = params.get("debug-step");
    return stepToDebug;
  }

  function _startForm() {
    setIsFormLoading(true);
    formEngine.current
      .start()
      .then((data) => {
        setIsFormLoading(false);
        setCurrentStep(data.step);
        setCapturedData(data.capturedData);
        setFormFlowMetadata(data.meta);
      })
      .catch(_handleTransitionError);
  }

  function _startDebugStep(stepSlug) {
    setIsFormLoading(true);
    formEngine.current.debugStep(stepSlug).then((data) => {
      setIsFormLoading(false);
      setCurrentStep(data.step);
      setCapturedData(data.capturedData);
      setFormFlowMetadata(data.meta);
    });
  }

  function goNextStep(stepFieldsPayload) {
    setIsFormLoading(true);
    const isLastStep = currentStep?.position === formflowMetadata.lastStep;
    formEngine.current
      .nextStep(currentStep.data.slug, stepFieldsPayload)
      .then((data) => {
        if (isLastStep) {
          setFormEndPayload(data);
          setFormFlowHasBeenFinished(true);
        } else {
          setIsFormLoading(false);
          setCapturedData(data.capturedData);
          setStagedStep(data.step);
          setFormFlowMetadata(data.meta);
        }
      })
      .catch(_handleTransitionError);
  }

  function goPreviousStep() {
    formEngine.current
      .previousStep(currentStep.data.slug)
      .then((data) => {
        setCapturedData(data.capturedData);
        setStagedStep(data.step);
        setFormFlowMetadata(data.meta);
      })
      .catch(_handleTransitionError);
  }

  function commitStepChange() {
    setLastVisitedStep(currentStep);
    setCurrentStep(stagedStep);
    setStagedStep(null);
  }

  function addRequestsMetadata(key, data = {}) {
    formEngine.current.addRequestMetadataItem(key, data);
  }
  function removeRequestsMetadata(key) {
    formEngine.current.removeRequestMetadataItem(key);
  }

  function getRequestsMetadata() {
    return formEngine.current.requestsMetadata;
  }

  function _handleTransitionError() {}

  return {
    //states
    isFormLoading,
    formFlowHasBeenFinished,
    //data
    currentStep,
    formflowMetadata,
    capturedData,
    formEndPayload,
    lastVisitedStep,
    remoteValidationErrors,
    // methods
    goNextStep,
    goPreviousStep,
    commitStepChange,
    addRequestsMetadata,
    removeRequestsMetadata,
    getRequestsMetadata,
  };
}

export default useFireboltProvider;
