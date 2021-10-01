import React from "react"
import FireboltContext from "../../context"
import useFireboltProvider from "./hook"
import PropTypes from "prop-types"

/**
 * @param {{formSource: import("../../../core/types").FormSource, debugMode: boolean, stepQueryParam: string}} props
 */
const FireboltProvider = ({
  formSource,
  debugMode = false,
  stepQueryParam = "step",
  ...props
}) => {
  const {
    goNextStep,
    goPreviousStep,
    currentStep,
    hasFormLoaded,
    formMeta,
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
  } = useFireboltProvider({ formSource, debugMode, stepQueryParam })

  return (
    <FireboltContext.Provider
      value={{
        debugMode,
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
      }}
      {...props}
    />
  )
}

FireboltProvider.propTypes = {
  /** use fireboltStep query to debug form steps  */
  debugMode: PropTypes.bool,
  formSource: PropTypes.shape({
    root: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
  }).isRequired,
}

export default FireboltProvider
