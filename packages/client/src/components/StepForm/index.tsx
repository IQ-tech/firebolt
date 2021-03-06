import React from "react"
import useFirebolt from "../../hooks/useFirebolt"
import FireboltForm from "../FireboltForm"
import Insert from "../FireboltForm/Insert"

const StepForm = (props) => {
  const {
    goNextStep,
    goPreviousStep,
    remoteErrors,
    currentStep,
    clearRemoteFieldError,
  } = useFirebolt()

  return (
    <FireboltForm
      schema={currentStep.data?.fields}
      onSubmit={goNextStep}
      onGoBack={goPreviousStep}
      remoteErrors={remoteErrors}
      clearRemoteFieldError={clearRemoteFieldError}
      {...props}
    />
  )
}

StepForm.Insert = Insert

export default StepForm
