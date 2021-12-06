import useFormState from "./useFormState";
import useFormEvents from "./useFormEvents";
import useFormRendering from "./useFormRendering";

export default function useFireboltForm({
  schema,
  children,
  onChange,
  onSubmit,
  theme,
  autoFill,
  remoteErrors,
  onGoBack,
  classes
}) {
  const {
    isFormValid,
    formPayload,
    modifyPayloadKeys,
    fieldValidationErrors,
    hasFormChanged,
    setHasFormChanged,
    setFieldWarning,
    clearFieldWarning,
    markAllInvalidFields,
    fieldManuallySetErrors,
  } = useFormState({
    schema,
    autoFill,
    remoteErrors,
  });

  const { getFieldEvent, handleSubmit, handleGoBack } = useFormEvents({
    onChange,
    onSubmit,
    formPayload,
    modifyPayloadKeys,
    isFormValid,
    hasFormChanged,
    setHasFormChanged,
    setFieldWarning,
    clearFieldWarning,
    markAllInvalidFields,
    onGoBack,
  });

  const { formChildren } = useFormRendering({
    schema,
    modifyPayloadKeys,
    children,
    formPayload,
    getFieldEvent,
    fieldValidationErrors,
    fieldManuallySetErrors,
    theme,
    setFieldWarning,
    clearFieldWarning,
    classes
  });

  return {
    isFormValid,
    handleSubmit,
    handleGoBack,
    formChildren,
    actionsChildData: {
      isFormValid,
      handleSubmit,
      payload: formPayload, // #TODO
      currentStep: 1, //#TODO
    },
  };
}
