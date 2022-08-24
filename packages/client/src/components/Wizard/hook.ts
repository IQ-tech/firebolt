import { useEffect } from "react"
import { useFirebolt } from "../../hooks/useFirebolt"
import { IWizardHook } from "../../types"

export default function useWizard({
  onChangeStep,
  onConnectionError,
  onFinishForm,
  onBeforeChangeStep,
  onBeforeProceed,
}: IWizardHook) {
  const {
    isFormLoading,
    currentStep,
    lastVisitedStep,
    formFlowHasBeenFinished,
    formEndPayload,
    stagedStep,
    commitStepChange,

    connectionError,
    setTriggerOnBeforeProceed,
    triggerOnBeforeProceed,
  } = useFirebolt()

  useEffect(onStepChangeHandler, [currentStep])

  useEffect(() => {
    if (!!stagedStep) onBeforeStepChangeHandler()
  }, [stagedStep])

  useEffect(onConnectionErrorHandler, [connectionError])
  useEffect(onFormFinishedCallback, [formFlowHasBeenFinished])

  useEffect(onBeforeProceedHandler, [triggerOnBeforeProceed])

  function onConnectionErrorHandler() {
    if (connectionError && !!onConnectionError) {
      onConnectionError()
    }
  }

  function onBeforeProceedHandler() {
    if (!!triggerOnBeforeProceed) {
      if (!!onBeforeProceed) {
        onBeforeProceed(currentStep)
      }
      setTriggerOnBeforeProceed(false)
    }
  }

  function onBeforeStepChangeHandler() {
    const proceedCallback = () => commitStepChange()

    if (!!onBeforeChangeStep) {
      onBeforeChangeStep(proceedCallback, {
        leavingStep: currentStep,
        enteringStep: stagedStep,
      })
    } else {
      proceedCallback()
    }
  }

  function onStepChangeHandler() {
    const notIsFirstStepRendered = !!lastVisitedStep?.position
    if (notIsFirstStepRendered && !!onChangeStep) {
      onChangeStep({ sentStep: lastVisitedStep, currentStep })
    }
  }

  function onFormFinishedCallback() {
    if (!!formFlowHasBeenFinished && !!onFinishForm) {
      const payload = formEndPayload || {}
      onFinishForm(payload)
    }
  }

  return {
    isFormLoading,
    currentStepSlug: currentStep?.data?.slug,
  }
}
