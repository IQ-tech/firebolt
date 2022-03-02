import useFirebolt from "../../../hooks/useFirebolt";

export default function useStep() {
  const {
    goNextStep,
    goPreviousStep,
    currentStep,
    formflowMetadata,
    capturedData,
    remoteErrors,
    clearSession
  }: any = useFirebolt();  // TODO: ANY

  const { data: stepData = {}, ...rest } = currentStep;

  const fireboltStep = {
    ...rest,
    ...stepData,
    goNextStep,
    goPreviousStep,
    formflowMetadata,
    capturedData,
    remoteErrors,
    clearSession
  };

  return { fireboltStep };
}
