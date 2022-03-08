import { useState, useEffect } from "react"
import { validateFBTStep } from "@iq-firebolt/validators"

export default function useFormState({ schema, autoFill, remoteErrors }) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [formPayload, setFormPayload] = useState({})
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const [isHavingInternaLoading, setIsHavingInternalLoading] = useState(false)
  // field errors
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [fieldManuallySetErrors, setFieldManuallySetErrors] = useState({})

  useEffect(validateForm, [formPayload, fieldManuallySetErrors])
  useEffect(autoFillFromProp, [autoFill])
  useEffect(autoFillFromAPI, [schema])
  useEffect(setRemoteErrors, [remoteErrors])

  // Autofill FormPayload from autofill prop
  function autoFillFromProp() {
    const newPayload = { ...formPayload, ...autoFill }
    if (!!autoFill) {
      setFormPayload(newPayload)
    }
  }

  function setRemoteErrors() {
    if (remoteErrors?.length) {
      const newErrorModel = remoteErrors.reduce((acc, nxtItem) => {
        const safeNextObj = nxtItem || {}
        const validatorResult = safeNextObj["validationResults"] || []
        return { ...acc, [nxtItem?.slug]: validatorResult[0]?.message }
      }, {})

      setFieldValidationErrors({ ...fieldValidationErrors, ...newErrorModel })
    }
  }

  // Autofill form when api send fields already with data
  function autoFillFromAPI() {
    const autoFilledPayload = schema.reduce((acc, field) => {
      const { slug, value } = field
      const autoFillObj = value
        ? {
            [slug]: value,
          }
        : {}

      return { ...acc, ...autoFillObj }
    }, {})

    setFormPayload(autoFilledPayload)
  }

  function setFieldWarning(fieldSlug, message, manualSetError = false) {
    const usedState = manualSetError
      ? fieldManuallySetErrors
      : fieldValidationErrors
    const usedSetter = manualSetError
      ? setFieldManuallySetErrors
      : setFieldValidationErrors

    usedSetter({
      ...usedState,
      [fieldSlug]: message,
    })
  }

  function clearFieldWarning(fieldSlug, manualSetError = false) {
    const { invalidFields } = getFormValidation()
    const usedState = manualSetError
      ? fieldManuallySetErrors
      : fieldValidationErrors
    const usedSetter = manualSetError
      ? setFieldManuallySetErrors
      : setFieldValidationErrors

    const erroredFieldsSlugs = Object.keys(usedState)
    const filteredSlugs = erroredFieldsSlugs
      .filter((errorSlug) => invalidFields.includes(errorSlug))
      .filter((slug) => slug !== fieldSlug)
    const newErroredFields = filteredSlugs.reduce((acc, slug) => {
      return {
        ...acc,
        [slug]: usedState[slug],
      }
    }, {})
    usedSetter(newErroredFields)
  }

  function getFormValidation() {
    return validateFBTStep({
      stepFields: schema,
      formPayload,
      context: "client",
    })
  }

  function validateForm() {
    const stepValidation = getFormValidation()
    const isFormValidCheck = stepValidation.isValid
    const hasFieldsError = !!Object.keys(fieldValidationErrors).length
    const hasManualSetErrors = !!Object.keys(fieldManuallySetErrors).length
    if (isFormValidCheck && !hasFieldsError && !hasManualSetErrors) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  function markAllInvalidFields() {
    const formValidation = getFormValidation()
    const invalidFields = formValidation?.invalidFields || []
    const errorsObject = invalidFields.reduce((acc, field) => {
      const fieldSlug = field?.slug
      const errorMessage = field?.validationResults?.[0]?.message
      return {
        ...acc,
        [fieldSlug]: errorMessage,
      }
    }, {})

    setFieldValidationErrors(errorsObject)
  }

  function modifyPayloadKeys(newData = {}) {
    setFormPayload({
      ...formPayload,
      ...newData,
    })
  }

  return {
    isFormValid,
    formPayload,
    fieldValidationErrors,
    fieldManuallySetErrors,
    modifyPayloadKeys,
    hasFormChanged,
    setHasFormChanged,
    isHavingInternaLoading,
    setIsHavingInternalLoading,
    setFieldWarning,
    clearFieldWarning,
    markAllInvalidFields,
  }
}