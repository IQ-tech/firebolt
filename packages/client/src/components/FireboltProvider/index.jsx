import FireboltContext from "../../context"
import useFireboltProvider from "./hook"
import PropTypes from "prop-types"

/**
 * @param {{formSource: import("@iq-firebolt/client-core/lib/types").FormSource, debugMode: boolean, stepQueryParam: string}} props
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
        // data
        connectionError,
        validationErrors,
        formMeta,
        formCapturedData,
        formEndPayload,
        currentStep,
        stepsHistory,

        // move rule to client-core
        removeRequestsMetadata,
        requestsMetadata,
        addRequestsMetadata,

        // state
        debugMode,
        hasFormLoaded,
        formHasBeenFinished,

        // methods
        goNextStep,
        goPreviousStep,
        webhookResult, //put inside step
        
        // kill
        lockStepTransition,
        lockedNavigation,
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
