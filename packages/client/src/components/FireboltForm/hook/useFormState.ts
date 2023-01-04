import { useState, useEffect } from "react"
import { validateFBTStep } from "@iq-firebolt/validators"
import { IFieldsObject, IFormState } from "../../../types"
import { getFormattedPropsPresets } from "@iq-firebolt/client-core"
import { IgetFormattedPropsPresets } from "@iq-firebolt/client-core/lib/formatters/applyPropsPresets"

export default function useFormState({
  schema,
  autoFill,
  remoteErrors,
  addons,
}: IFormState) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [formPayload, setFormPayload] = useState<IFieldsObject>({})
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const [standalonePropsPresets, setStandalonePropsPresets] = useState<
    IgetFormattedPropsPresets | undefined
  >()
  const [isHavingInternaLoading, setIsHavingInternalLoading] = useState(false)
  const [fieldValidationErrors, setFieldValidationErrors] =
    useState<IFieldsObject>({})
  const [fieldManuallySetErrors, setFieldManuallySetErrors] =
    useState<IFieldsObject>({})
  const [requiredFieldsSlugs, setRequiredFieldsSlugs] = useState<string[]>([])

  useEffect(validateForm, [formPayload, fieldManuallySetErrors])
  useEffect(autoFillFromProp, [autoFill])
  useEffect(autoFillFromAPI, [schema])
  useEffect(setRemoteErrors, [remoteErrors])
  useEffect(setupStandalonePropsPresets, [addons])

  useEffect(() => {
    const requiredFields = schema.filter((field) =>
      field?.validators?.find((validator) => validator.type === "required")
    )
    const slugs = requiredFields.map((field) => field.slug)

    setRequiredFieldsSlugs(slugs)
  }, [schema])

  function setupStandalonePropsPresets() {
    if (addons?.uiPropsPresets) {
      const formattedPropsPresets = getFormattedPropsPresets(
        addons.uiPropsPresets
      )
      setStandalonePropsPresets(formattedPropsPresets)
    } else {
      setStandalonePropsPresets(undefined)
    }
  }
  // Autofill FormPayload from autofill prop
  function autoFillFromProp() {
    const newPayload = { ...formPayload, ...autoFill }
    if (!!autoFill) {
      setFormPayload(newPayload)
    }
  }

  function getNewRemoteErrors() {
    const safeRemoteErrors = remoteErrors || []
    return safeRemoteErrors.reduce((acc, nxtItem) => {
      const safeNextObj = nxtItem || {}
      const validatorResult = safeNextObj["validationResults"] || []
      return { ...acc, [nxtItem?.slug]: validatorResult[0]?.message }
    }, {})
  }

  function setRemoteErrors() {
    if (remoteErrors?.length) {
      const newErrorModel = getNewRemoteErrors()
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

  function setFieldWarning(
    fieldSlug: string,
    message: string,
    manualSetError = false
  ) {
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

  function clearFieldWarning(fieldSlug: string, manualSetError = false) {
    const usedState = manualSetError
      ? fieldManuallySetErrors
      : fieldValidationErrors
    const usedSetter = manualSetError
      ? setFieldManuallySetErrors
      : setFieldValidationErrors

    const erroredFieldsSlugs = Object.keys(usedState)
    const filteredSlugs = erroredFieldsSlugs.filter(
      (slug) => slug !== fieldSlug
    )
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
    const remoteErrorsObject = getNewRemoteErrors()

    setFieldValidationErrors({ ...errorsObject, ...remoteErrorsObject })
  }

  function modifyPayloadKeys(newData: IFieldsObject = {}) {
    const newPayload = { ...formPayload, ...newData }
    setFormPayload(newPayload)
    return newPayload
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
    standalonePropsPresets,
    requiredFieldsSlugs,
    setRemoteErrors,
  }
}
