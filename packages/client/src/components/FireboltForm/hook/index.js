import useFormState from "./useFormState"
import useFormEvents from "./useFormEvents"
import useFormRendering from "./useFormRendering"

export default function useFireboltForm({
  schema,
  children,
  onChange,
  onSubmit,
  theme,
  autoFill,
  remoteErrors
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
    fieldManuallySetErrors
  } = useFormState({
    schema,
    autoFill,
    remoteErrors
  })

  const { getFieldEvent, handleSubmit } = useFormEvents({
    onChange,
    onSubmit,
    formPayload,
    modifyPayloadKeys,
    isFormValid,
    hasFormChanged,
    setHasFormChanged,
    setFieldWarning,
    clearFieldWarning,
    markAllInvalidFields
  })

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
    clearFieldWarning
  })

  return {
    isFormValid,
    handleSubmit,
    formChildren,
    actionsChildData: {
      isFormValid,
      handleSubmit,
      payload: formPayload, // #TODO
      currentStep: 1, //#TODO
    },
  }
}
