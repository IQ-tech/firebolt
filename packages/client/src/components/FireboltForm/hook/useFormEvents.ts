import { useEffect } from "react"
import { validateFBTField } from "@iq-firebolt/validators"

export default function useFieldsEvents({
  formPayload,
  onChange,
  onSubmit,
  modifyPayloadKeys,
  isFormValid,
  hasFormChanged,
  setHasFormChanged,
  setFieldWarning,
  clearFieldWarning,
  markAllInvalidFields,
  onGoBack,
  onFocusField,
  requiredFieldsSlugs,
  remoteErrors,
  setRemoteErrors,
  clearRemoteFieldError,
}) {
  useEffect(() => {
    if (!!onChange && hasFormChanged) {
      onChange(formPayload)
    }
  }, [formPayload, onChange])

  useEffect(() => {
    const isAllRequiredFieldsFilled = requiredFieldsSlugs.every(
      (item) => !!formPayload[item]
    )
    if (isAllRequiredFieldsFilled && requiredFieldsSlugs.length)
      markAllInvalidFields()
    if (remoteErrors?.length) setRemoteErrors()
  }, [formPayload])

  function validateField(field: { slug: string }, value: string) {
    return validateFBTField({
      value,
      field,
      formPayload,
      context: "client",
    })
  }

  function getOnFieldBlur(field: { slug: string }): Function {
    const fieldSlug = field?.slug
    return (value: string) => {
      const fieldValidation = validateField(field, value)
      const isValueValid = fieldValidation.isValid

      if (isValueValid) {
        clearFieldWarning(fieldSlug)
      } else {
        const errorMessage = fieldValidation?.invalidValidations[0]?.message
        setFieldWarning(fieldSlug, errorMessage)
      }
    }
  }

  function getOnFieldChange(field: { slug: string }): Function {
    const fieldSlug = field?.slug
    return (value: string) => {
      const isValueValid = validateField(field, value).isValid
      if (!hasFormChanged) setHasFormChanged(true)
      modifyPayloadKeys({ [fieldSlug]: value })
      if (isValueValid) {
        const safeRemoteErrors = remoteErrors || []
        const hasRemoteError = safeRemoteErrors?.find(
          (item) => item.slug === field.slug
        )
        clearFieldWarning(fieldSlug)
        if (hasRemoteError && clearRemoteFieldError) {
          clearRemoteFieldError(field.slug)
        }
      }
    }
  }

  function getOnFieldFocus(field: { slug: string }) {
    return () => !!onFocusField && onFocusField(field)
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    if (e && e?.preventDefault) e?.preventDefault()
    if (!!onSubmit && isFormValid) {
      onSubmit(formPayload)
    }

    if (!isFormValid) {
      markAllInvalidFields()
    }
  }

  function handleGoBack(e: { preventDefault: () => void }) {
    e?.preventDefault()
    if (!!onGoBack) {
      onGoBack(formPayload)
    }
  }

  return {
    handleSubmit,
    handleGoBack,
    getFieldEvent: {
      onBlur: getOnFieldBlur,
      onChange: getOnFieldChange,
      onFocus: getOnFieldFocus,
    },
  }
}
