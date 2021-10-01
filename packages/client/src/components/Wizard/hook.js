import { useEffect } from "react"
import { useFirebolt } from "../../hooks/useFirebolt"

export default function useWizard({
  onChangeStep,
  onConnectionError,
  onFinishForm,
}) {
  const {
    hasFormLoaded,
    currentStep,
    stepsHistory,
    connectionError,
    formHasBeenFinished,
    formEndPayload,
  } = useFirebolt()

  const currentStepId = currentStep?.id

  useEffect(_runChangeStepCallback, [stepsHistory])
  useEffect(_runConnectionErrorCallback, [connectionError])
  useEffect(_runFormFinishedCallback, [formHasBeenFinished])

  function _runConnectionErrorCallback() {
    if (connectionError && !!onConnectionError) {
      onConnectionError()
    }
  }

  function _runChangeStepCallback() {
    if (stepsHistory.length && !!onChangeStep) {
      const lastCompletedStep = stepsHistory[stepsHistory.length - 1]
      onChangeStep({ completedStep: lastCompletedStep, currentStep })
    }
  }

  function _runFormFinishedCallback() {
    if (!!formHasBeenFinished && !!onFinishForm) {
      const payload = formEndPayload || {}
      onFinishForm(payload)
    }
  }

  return {
    hasFormLoaded,
    currentStepId,
  }
}
