import useFirebolt from "../../../hooks/useFirebolt";

export default function useStep() {
  const {
    goNextStep,
    goPreviousStep,
    currentStep,
    formflowMetadata,
    validationErrors,
    capturedData,
  } = useFirebolt();

  const { data: stepData = {}, ...rest } = currentStep;

  const fireboltStep = {
    ...rest,
    ...stepData,
    goNextStep,
    goPreviousStep,
    formflowMetadata,
    validationErrors,
    capturedData,
  };

  return { fireboltStep };
}
