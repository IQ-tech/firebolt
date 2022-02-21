import { useRef, useEffect } from "react";
import { createFireboltForm } from "@iq-firebolt/client-core";
import getDebugStepName from "../../../helpers/getDebugStepName";

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
  addons = {}
}) {
  const formEngine = useRef(
    createFireboltForm(formAccess, { requestsMetadata, debug, addons })
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
    remoteErrors,
    setRemoteErrors,
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
    const debugStep = getDebugStepName();
    if (!!debugStep) {
      if (!debug)
        throw new Error(
          `Debug step is only allowed on debug mode: debug ${debugStep}`
        );
      _startDebugStep(debugStep);
    } else {
      _startForm();
    }
  }, []);

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
    return formEngine.current.debugStep(stepSlug).then((data) => {
      setIsFormLoading(false);
      setCurrentStep(data.step);
      setCapturedData(data.capturedData);
      setFormFlowMetadata(data.meta);
    });
  }

  function goNextStep(stepFieldsPayload) {
    setIsFormLoading(true);
    const isLastStep = currentStep?.data?.slug === formflowMetadata?.lastStep;
    return formEngine.current
      .nextStep(currentStep.data.slug, stepFieldsPayload)
      .then((data) => {
        if (isLastStep) {
          setFormEndPayload({
            webhookResult: data?.step?.webhookResult,
            capturedData: data?.step?.capturedData,
          });
          setFormFlowHasBeenFinished(true);
          clearSession();
        } else {
          setCapturedData(data.capturedData);
          setStagedStep(data.step);
          setFormFlowMetadata(data.meta);
        }
      })
      .catch(_handleTransitionError);
  }

  function goPreviousStep() {
    setIsFormLoading(true);
    return formEngine.current
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
    setIsFormLoading(false);
    setRemoteErrors([]);
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

  function clearSession() {
    formEngine.current.clearSession();
  }

  function _handleTransitionError(err) {
    const invalidFields = err?.response?.data?.errorData?.invalidFields || [];
    const isValidationError =
      err?.response?.status === 400 && !!invalidFields.length;
    if (isValidationError) {
      setRemoteErrors(invalidFields);
      setIsFormLoading(false);

      return { errors: invalidFields };
    }
  }

  function uploadFile(file) {
    return formEngine.current.uploadFile(file);
  }

  return {
    //states
    isFormLoading,
    formFlowHasBeenFinished,
    //data
    currentStep,
    stagedStep,
    formflowMetadata,
    capturedData,
    formEndPayload,
    lastVisitedStep,
    remoteErrors,
    theme, //todo
    // methods
    goNextStep,
    goPreviousStep,
    commitStepChange,
    addRequestsMetadata,
    removeRequestsMetadata,
    getRequestsMetadata,
    uploadFile,
    clearSession,
  };
}

export default useFireboltProvider;
