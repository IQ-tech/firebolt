import { useState, useEffect, useRef } from "react";
import {
  createFireboltForm,
  clearFormSession,
  getUrlParams,
} from "@iq-firebolt/client-core";

export function nuseFireboltProvider({
  formSource,
  debugMode,
  stepQueryParam,
}) {
  const fireboltForm = useRef(createFireboltForm(formSource, debugMode));

}

/**
 * @typedef {import("@iq-firebolt/client-core/lib/entities/StepTransition").default} StepTransition
 */

export function useFireboltProvider({ formSource, debugMode, stepQueryParam }) {
  const fireboltForm = createFireboltForm(formSource, debugMode);
  const debugQuery = "debug-step";

  // States
  const [hasFormLoaded, setHasFormLoaded] = useState(false);
  const [formMeta, setFormMeta] = useState({
    steps: [],
    lastStep: null,
  });
  const [currentStep, setCurrentStep] = useState({
    id: 0,
    fields: [],
    type: "",
  });
  const [lockedNavigation, setLockedNavigation] = useState({
    next: false,
    previous: false,
  }); // # V2-TODO remove this feature

  const [formCapturedData, setFormCapturedData] = useState({});

  // #v2-TODO remove steps history, replace by last visited step
  const [stepsHistory, setStepsHistory] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);
  const [connectionError, setConnectionError] = useState(false);
  const [formHasBeenFinished, setFormHasBeenFinished] = useState(false);
  
  const [formEndPayload, setFormEndPayload] = useState({});
  const [webhookResult, setWebhookResult] = useState({});
  const [requestsMetadata, setRequestsMetadata] = useState({});

  // Lifecycle
  useEffect(() => {
    const debugStep = debugMode ? _getDebugStep() : false;
    if (!debugStep) {
      _startFireboltExperience();
    } else {
      _startStepDebug(debugStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(setPopStateEvent, [currentStep, lockedNavigation]);

  // Methods
  function _getDebugStep() {
    const params = new URLSearchParams(window.location.search);
    const stepToDebug = params.get(debugQuery);
    return stepToDebug;
  }

  function setPopStateEvent() {
    // Treat form navigation with browser arrows
    window.onpopstate = _onPopStateEventHandler;
  }

  function _startStepDebug(stepId) {
    fireboltForm
      .debugStep(stepId)
      .then((res) => {
        _changeFormStep(res, true);
      })
      .catch(_handleConnectionError);
  }

  function _startFireboltExperience() {
    fireboltForm
      .start()
      .then((response) => {
        _changeFormStep(response);
      })
      .catch(_handleConnectionError);
  }

  /** @param {StepTransition} apiResponse */
  function _validateAndProceedStep(apiResponse) {
    const isValidationError = apiResponse.isValidationError;
    if (!isValidationError) {
      _changeFormStep(apiResponse);
    } else {
      setValidationErrors(apiResponse?.invalidFields);
      setHasFormLoaded(true);
    }
  }

  /** @param {StepTransition} apiResponse */
  function _changeFormStep(apiResponse, debug) {
    const pastStep = currentStep;
    const newStep = apiResponse?.currentStep;
    const newStepId = newStep?.id;
    const newStepLabel = newStep?.friendlyname;

    setWebhookResult(apiResponse.webhookResult);
    setCurrentStep({ ...newStep, webhookResult: apiResponse?.webhookResult });
    setFormMeta(apiResponse?.formMeta);
    setFormCapturedData(apiResponse?.formCapturedData);
    _updateBrowserHistory(newStepId, newStepLabel, debug);
    _updateStepsHistory(pastStep);
    setHasFormLoaded(true);
    setValidationErrors([]);
  }

  function _onPopStateEventHandler(e = {}) {
    const previousStep = e?.state?.step;
    const totalSteps = formMeta?.lastStep;
    const currentStepId = currentStep?.id;
    const isGoingToPreviousStep =
      !!previousStep && previousStep === currentStepId - 1;

    const isGoingToNextStep =
      !!previousStep &&
      previousStep === currentStepId + 1 &&
      currentStepId + 1 < totalSteps;

    const shouldLockTransition =
      (isGoingToNextStep && !!lockedNavigation?.next) ||
      (isGoingToPreviousStep && !!lockedNavigation?.previous);

    if (shouldLockTransition) {
      _reloadStep();
    } else if (isGoingToPreviousStep) {
      goPreviousStep();
    } else if (isGoingToNextStep) {
      goNextStep();
    }
  }

  // remove this feature
  function lockStepTransition(config) {
    const safeObj = config || {};
    const configKeys = Object.keys(safeObj);
    const configKeysAreValid = configKeys.every((item) =>
      configKeys.includes(item)
    );

    if (configKeysAreValid) {
      setLockedNavigation(config);
    }
  }

  function _handleConnectionError(err) {
    setConnectionError(true);
  }

  // Navigation

  function _updateStepsHistory(stepToAdd) {
    const isBaseStep = currentStep?.id === 0;
    if (!isBaseStep) {
      setStepsHistory([...stepsHistory, stepToAdd]);
    }
  }

  function _updateBrowserHistory(stepId, stepLabel, debug) {
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
        { step: stepId },
        stepLabel,
        `?${queryParam}=${stepId}${newQuery}`
      );
    }
  }

  function _reloadStep(debug) {
    _updateBrowserHistory(currentStep?.id, currentStep?.friendlyname, debug);
  }

  function _finalizeForm(stepFieldsData) {
    fireboltForm
      .nextStep(currentStep?.id, stepFieldsData, requestsMetadata)
      .then((response) => {
        const isValidationError = response.isValidationError;
        if (!isValidationError) {
          clearFormSession();
          setFormEndPayload(response);
          setFormHasBeenFinished(true);
        } else {
          setValidationErrors(response.invalidFields);
          setHasFormLoaded(true);
        }
      })
      .catch(_handleConnectionError);
  }

  function goNextStep(stepFieldsData) {
    const isNextLocked = !!lockedNavigation?.next;
    if (!isNextLocked) {
      const isLastStep = currentStep?.id === formMeta?.lastStep;
      setHasFormLoaded(false);
      if (!isLastStep) {
        fireboltForm
          .nextStep(currentStep?.id, stepFieldsData, requestsMetadata)
          .then((response) => {
            _validateAndProceedStep(response);
          })
          .catch(_handleConnectionError);
      } else {
        _finalizeForm(stepFieldsData);
      }
    }
  }

  function goPreviousStep() {
    const isPreviousLocked = !!lockedNavigation?.previous;
    if (!isPreviousLocked) {
      setHasFormLoaded(false);
      fireboltForm
        .previousStep(currentStep?.id)
        .then((response) => {
          _validateAndProceedStep(response);
        })
        .catch(_handleConnectionError);
    }
  }

  function addRequestsMetadata(data = {}) {
    setRequestsMetadata({ ...requestsMetadata, ...data });
  }

  function removeRequestsMetadata(key) {
    const filteredKeys = Object.keys(requestsMetadata).filter(
      (item) => item !== key
    );
    const newMetadata = filteredKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: requestsMetadata[key],
      }),
      {}
    );

    setRequestsMetadata(newMetadata);
  }

  return {
    formMeta,
    currentStep,
    hasFormLoaded,
    goNextStep,
    goPreviousStep,
    stepsHistory,
    connectionError,
    validationErrors,
    formCapturedData,
    formHasBeenFinished,
    formEndPayload,
    lockStepTransition,
    lockedNavigation,
    webhookResult,
    addRequestsMetadata,
    removeRequestsMetadata,
    requestsMetadata,
  };
}

export default useFireboltProvider;
