import { useRef } from "react"
import classNames from "classnames"
import { getFieldProps, IStepConfigField } from "@iq-firebolt/client-core/lib"
import { IgetFormttedPropsPresets } from "@iq-firebolt/client-core/lib/formatters/applyPropsPresets"
import { validateFBTField } from "@iq-firebolt/validators/src"
import { IFieldsObject } from "../../../../types"

import { getConditionalProps } from "./helpers"

export interface IUseInputHolder {
  FieldComponent?: any
  fieldProps?: any
  fieldConfig: IStepConfigField
  formPayload: {
    [fieldSlug: string]: any
  }
  hasFormChanged: boolean
  setHasFormChanged: React.Dispatch<React.SetStateAction<boolean>>
  modifyPayloadKeys: (newData?: IFieldsObject) => void
  clearFieldWarning: (fieldSlug: string, manualSetError?: boolean) => void
  setFieldWarning: (
    fieldSlug: string,
    message: string,
    manualSetError?: boolean
  ) => void
  onFocusField: (field: IStepConfigField) => void
  classes: any
  fieldValidationErrors: IFieldsObject
  fieldManuallySetErrors: IFieldsObject
  isRequiredField: boolean
  standalonePropsPresets: IgetFormttedPropsPresets | undefined
}

export default function useInputHolder({
  fieldConfig,
  formPayload,
  hasFormChanged,
  setHasFormChanged,
  modifyPayloadKeys,
  clearFieldWarning,
  setFieldWarning,
  onFocusField,
  classes,
  fieldManuallySetErrors,
  fieldValidationErrors,
  isRequiredField,
  standalonePropsPresets,
}: IUseInputHolder) {
  const inputRef = useRef(null)

  const {
    slug,
    meta = {}, //todo remove
    "ui:props": propsFromSchema = {},
    "ui:styles": propsStyles,
    "ui:props-conditional": propsConditional,
  } = fieldConfig
  const fieldId = `firebolt-form-field-${slug}`
  const value = formPayload[slug] || ""
  const hasError =
    Object.keys(fieldValidationErrors).includes(slug) ||
    Object.keys(fieldManuallySetErrors).includes(slug)

  const errorMessage =
    fieldValidationErrors?.[slug] ||
    fieldManuallySetErrors?.[slug] ||
    "Campo inválido"

  const computedClasses = classNames(classes["firebolt-input"], {
    [classes["firebolt-input--half"]]: propsStyles?.size === "half",
  })

  // props from 'ui:props-conditional json key
  const fieldsPropsConditional = getConditionalProps({
    formPayload,
    propsConditional,
  })

  // props from 'ui:props-preset json key
  const standalonePropsPresetsMap =
    (() => {
      if (!standalonePropsPresets) return {}
      return getFieldProps(
        fieldConfig,
        standalonePropsPresets.collectionsMap,
        standalonePropsPresets.allPresetsMap
      )
    })() || {}

  function onChangeFieldHandler(value: string) {
    const fieldSlug = fieldConfig?.slug
    const isValueValid = validateField({
      field: fieldConfig,
      value,
      formPayload,
    }).isValid
    modifyPayloadKeys({ [fieldSlug]: value })
    if (isValueValid) {
      clearFieldWarning(fieldSlug)
    }
    if (!hasFormChanged) setHasFormChanged(true)
  }

  function onBlurFieldHandler(value: string) {
    const fieldSlug = fieldConfig?.slug
    const fieldValidation = validateField({
      field: fieldConfig,
      value,
      formPayload,
    })
    const isValueValid = fieldValidation.isValid

    if (isValueValid) {
      clearFieldWarning(fieldSlug)
    } else {
      const errorMessage = fieldValidation?.invalidValidations[0]?.message
      setFieldWarning(fieldSlug, errorMessage)
    }
  }

  function onFocusFieldHandler() {
    if (!!onFocusField) {
      onFocusField(fieldConfig)
    }
  }

  function manuallySetFieldErrorHandler(message) {
    setFieldWarning(slug, message, true)
  }

  function clearManuallySetErrorHandler() {
    clearFieldWarning(slug, true)
  }

  const nfieldProps = {
    ...propsFromSchema,
    ...standalonePropsPresetsMap,
    ...fieldsPropsConditional,
    fieldId,
    slug,
    value,
    hasError,
    meta, // todo - remove
    payload: formPayload,
    isValid: !hasError,
    isRequired: isRequiredField,
    isOptional: !isRequiredField,
    errorMessage,
    modifyPayloadKeys,
    fieldValidators: fieldConfig?.validators || [],
    onChange: onChangeFieldHandler,
    onBlur: onBlurFieldHandler,
    onFocus: onFocusFieldHandler,
    manuallySetFieldError: manuallySetFieldErrorHandler,
    clearManuallySetError: clearManuallySetErrorHandler,
  }

  return {
    computedClasses,
    slug,
    nfieldProps,
  }
}

interface IvalidateField {
  value: string
  field: IStepConfigField
  formPayload: { [fieldSlug: string]: any }
}
function validateField({ value, field, formPayload }: IvalidateField) {
  return validateFBTField({
    value,
    field,
    formPayload,
    context: "client",
  })
}
