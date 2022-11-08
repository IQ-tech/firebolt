import { useRef } from "react"
import classNames from "classnames"
import useMaskedInput from "./useMask"
import { getFieldProps, IStepConfigField } from "@iq-firebolt/client-core"
import { IgetFormattedPropsPresets } from "@iq-firebolt/client-core/lib/formatters/applyPropsPresets"
import { IFieldsObject } from "../../../../types"
import { getConditionalProps, validateField } from "./helpers"

export interface IUseInputHolder {
  FieldComponent?: any
  fieldProps?: any
  fieldConfig: IStepConfigField
  fieldSlug: string
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
  onFocusField: (field: IStepConfigField, formPayload?: Object) => void
  onBlurField?: (
    field: IStepConfigField,
    value: string,
    formPayload: Object,
    isValueValid: boolean
  ) => void
  onChangeField?: (
    field: IStepConfigField,
    values: { value: any; previousValue: any, isValid: boolean },
    formPayload?: Object
  ) => void
  classes: any
  fieldValidationErrors: IFieldsObject
  fieldManuallySetErrors: IFieldsObject
  isRequiredField: boolean
  standalonePropsPresets: IgetFormattedPropsPresets | undefined
  clearRemoteFieldError?: (fieldSlug: string) => void
  remoteErrors: IFieldsObject[]
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
  onBlurField,
  onChangeField,
  classes,
  fieldManuallySetErrors,
  fieldValidationErrors,
  isRequiredField,
  standalonePropsPresets,
  clearRemoteFieldError,
  remoteErrors,
}: IUseInputHolder) {
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

  const inputRef = useRef()
  const mask =
    propsFromSchema.mask ||
    fieldsPropsConditional.mask ||
    standalonePropsPresetsMap.mask

  const onChangeMask = useMaskedInput({
    input: inputRef,
    mask: mask ? mask : false,
    value,
    onChange: (value: string) => onChangeFieldHandler(value),
  })

  function onChangeFieldHandler(value: string) {
    const fieldSlug = fieldConfig?.slug
    const currentValue = formPayload[fieldSlug]
    const isValueValid = validateField({
      field: fieldConfig,
      value,
      formPayload,
    }).isValid
    modifyPayloadKeys({ [fieldSlug]: value })
    if (isValueValid) {
      const safeRemoteErrors = remoteErrors || []
      const hasRemoteError = safeRemoteErrors?.find(
        (item) => item.slug === fieldConfig.slug
      )
      clearFieldWarning(fieldSlug)
      if (hasRemoteError && clearRemoteFieldError) {
        clearRemoteFieldError(fieldConfig.slug)
      }
    }
    if (!hasFormChanged) setHasFormChanged(true)
    if (onChangeField)
      onChangeField(fieldConfig, { value, previousValue: currentValue, isValid: isValueValid }, formPayload)
  }

  function onBlurFieldHandler(value: string) {
    const fieldSlug = fieldConfig?.slug

    const fieldValidation = validateField({
      field: fieldConfig,
      value,
      formPayload,
    })
    const isValueValid = fieldValidation.isValid
    const checkSpaces = /( )+/g

    if (isValueValid) {
      const safeRemoteErrors = remoteErrors || []
      const hasRemoteError = safeRemoteErrors?.find(
        (item) => item.slug === fieldConfig.slug
      )
      
      if(!hasRemoteError){
        clearFieldWarning(fieldSlug)
      }
    } else {
      const errorMessage =
        fieldValidation?.invalidValidations?.[0]?.message || ""
      setFieldWarning(fieldSlug, errorMessage)
    }

    if (checkSpaces.test(value)) {
      modifyPayloadKeys({ [fieldSlug]: value.replace(checkSpaces, " ").trim() })
    }

    if (onBlurField) onBlurField(fieldConfig, value, formPayload, isValueValid)
  }

  function onFocusFieldHandler() {
    if (!!onFocusField) {
      onFocusField(fieldConfig, formPayload)
    }
  }

  function manuallySetFieldErrorHandler(message) {
    setFieldWarning(slug, message, true)
  }

  function clearManuallySetErrorHandler() {
    clearFieldWarning(slug, true)
  }

  const fieldProps = {
    ...propsFromSchema,
    ...standalonePropsPresetsMap,
    ...fieldsPropsConditional,
    fieldId,
    inputRef,
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
    onChange: mask ? onChangeMask : onChangeFieldHandler,
    onBlur: onBlurFieldHandler,
    onFocus: onFocusFieldHandler,
    manuallySetFieldError: manuallySetFieldErrorHandler,
    clearManuallySetError: clearManuallySetErrorHandler,
  }

  return {
    computedClasses,
    slug,
    fieldProps,
  }
}
