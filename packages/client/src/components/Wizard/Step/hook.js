import useFirebolt from "../../../hooks/useFirebolt"

export default function useStep() {
  const {
    goNextStep,
    goPreviousStep,
    currentStep,
    formMeta,
    validationErrors,
    formCapturedData,
    webhookResult
  } = useFirebolt()

  const fireboltStep = {
    id: currentStep.id,
    friendlyname: currentStep.friendlyname,
    fields: currentStep.fields,
    goNextStep,
    goPreviousStep,
    formMeta,
    validationErrors,
    formCapturedData,
    webhookResult
  }

  return { fireboltStep }
}
