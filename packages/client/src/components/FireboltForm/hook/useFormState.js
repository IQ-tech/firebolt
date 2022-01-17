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

    // TODO: Fix 01
    const validErrors = erroredFieldsSlugs.filter((errorSlug) =>
      invalidFields.includes(errorSlug)
    )
    const filteredSlugs = validErrors.filter((slug) => slug !== fieldSlug)
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

/* Fix 01
  BUG: 
    1. campo obrigatório com conditional relacionado a um checkbox
    2. o checkbox é selecionado, o campo aparece, vc clica nele e não coloca nenhum valor
    3. esse campo fica marcado com um erro por causa da validação de obrigatório
    4. o campo checkbox ao qual ele é relacionado é desmarcado mas o erro desse campo ainda continua travando o envio do form

  INVESTIGAÇÃO:
    - Esse erro está sendo salvo pela função "setFieldWarning", o erro fica dentro do state "fieldValidationErrors"

  SOLUÇÃO ATUAL:
    Como a validação feita pela função "validateFBTStep" já está validando a conditional ela retorna apenas os erros dos campos que estão visíveis na tela
    então usei ela pra filtrar dos erros aqueles que são relacionados a outro campo e que não estão mais visíveis na tela
*/
