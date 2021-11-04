import { useRef, useEffect } from "react";
import { createFireboltForm } from "@iq-firebolt/client-core";

import useStates from "./useStates";
import useData from "./useData";

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

  const { isFormLoading, formFlowHasBeenFinished } = useStates();
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

  useEffect(() => {
    const debugStep = debug ? _getDebugStep() : false;

    if (!debugStep) {
      _startForm();
    } else {
      _startStepDebug(debugStep);
    }
  }, []);

  function _getDebugStep() {
    const params = new URLSearchParams(window.location.search);
    const stepToDebug = params.get(debugQuery);
    return stepToDebug;
  }

  function _startForm() {
    formEngine.current.start().then((data) => {
      console.log(data);
    });
  }

  function _startDebugStep() {}

  function goNextStep(stepFieldsPayload) {}

  function goPreviousStep() {}

  function _handleTransitionError(){
    
  }

  return {};
}

export default useFireboltProvider;
