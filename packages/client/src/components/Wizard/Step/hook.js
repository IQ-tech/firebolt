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
    // #V2-TODO - spread currentStep
    // #V2-TODO - spread useFirebolt
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
