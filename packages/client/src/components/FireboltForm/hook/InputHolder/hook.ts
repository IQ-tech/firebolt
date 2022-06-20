import { useEffect, useRef } from "react"
import classNames from "classnames"
import { getFieldProps, IStepConfigField } from "@iq-firebolt/client-core/lib"
import { validateFBTField } from "@iq-firebolt/validators/src"
import { IFieldsObject } from "../../../../types"

// @ts-ignore
import classes from "./style.module.css"

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
}: IUseInputHolder) {
  const inputRef = useRef(null)

  const {
    slug,
    meta = {},
    conditional,
    "ui:widget": widgetName,
    "ui:props": propsFromSchema = {},
    "ui:styles": propsStyles,
    "ui:props-conditional": propsConditional,
  } = fieldConfig

  const computedClasses = classNames(classes["firebolt-input"], {
    [classes["firebolt-input--half"]]: propsStyles?.size === "half",
  })

  useEffect(() => {
    console.log("input loaded", "sdf")
  }, [])

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

  return {
    computedClasses,
    slug,
    onChangeFieldHandler,
    onBlurFieldHandler,
    onFocusFieldHandler,
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
