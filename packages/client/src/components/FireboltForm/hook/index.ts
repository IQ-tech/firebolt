import useFormState from "./useFormState"
import useFormEvents from "./useFormEvents"
import useFormRendering from "./useFormRendering"
import {
  IActionsChildData,
  IUseFireboltForm
} from "../../../types"

export default function useFireboltForm(
  {
    schema,
    children,
    onChange,
    onSubmit,
    theme,
    autoFill,
    remoteErrors,
    onGoBack,
    onFocusField,
    onChangeField,
    onBlurField,
    addons,
    classes,
    clearRemoteFieldError
  }: IUseFireboltForm,
) {
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
    standalonePropsPresets,
    requiredFieldsSlugs,
    setRemoteErrors
  } = useFormState({
    schema,
    autoFill,
    remoteErrors,
    addons,
  })

  const { handleSubmit, handleGoBack } = useFormEvents({
    onChange,
    onSubmit,
    formPayload,
    isFormValid,
    hasFormChanged,
    markAllInvalidFields,
    onGoBack,
    requiredFieldsSlugs,
    remoteErrors,
    setRemoteErrors,
  })

  const { formChildren } = useFormRendering({
    schema,
    modifyPayloadKeys,
    children,
    formPayload,
    fieldValidationErrors,
    fieldManuallySetErrors,
    theme,
    setFieldWarning,
    clearFieldWarning,
    standalonePropsPresets,
    hasFormChanged,
    setHasFormChanged,
    onFocusField,
    onChangeField,
    onBlurField,
    classes,
  })

  const actionsChildData: IActionsChildData = {
    isFormValid,
    handleSubmit,
    payload: formPayload, // #TODO
    currentStep: 1, //#TODO
  }

  return {
    isFormValid,
    handleSubmit,
    handleGoBack,
    formChildren,
    actionsChildData,
  }
}
