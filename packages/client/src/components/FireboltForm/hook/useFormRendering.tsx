import React from "react"
import evaluate from "simple-evaluate"
import { getFieldProps, IStepConfigField } from "@iq-firebolt/client-core/lib"
import getFieldComponent from "./helpers/getFieldComponent"
import remapFormChildren from "./helpers/remapFormChildren"
import getConditionalProps from "./helpers/getConditionalProps"
import InputHolder from "./InputHolder"

export default function useFormRendering({
  schema,
  theme,
  children: insertsChildren,
  formPayload,
  modifyPayloadKeys,
  getFieldEvent,
  fieldValidationErrors,
  fieldManuallySetErrors,
  setFieldWarning,
  clearFieldWarning,
  classes,
  standalonePropsPresets,
}) {
  // get correct widgets components
  const fieldsChildren = schema.map(
    (field: IStepConfigField = {} as IStepConfigField, index: number) => {
      const {
        slug,
        meta = {},
        conditional,
        "ui:widget": widgetName,
        "ui:props": propsFromSchema = {},
        "ui:props-conditional": propsConditional,
      } = field



      const safeTheme = theme || {}
      const hasConditionalRender = !!conditional
      const isConditionallyValid = hasConditionalRender
        ? evaluate({ step: formPayload }, conditional)
        : true
      const shouldHideField = widgetName === "hidden" || !isConditionallyValid
      const fieldId = `firebolt-form-field-${slug}`
      const fieldValidators = field?.validators || []
      const isRequiredField = !!fieldValidators.find(
        (validator: { type: string }) => validator?.type === "required"
      )
      const isOptionalField = !isRequiredField
      const value = formPayload[slug] || ""
      const hasError =
        Object.keys(fieldValidationErrors).includes(slug) ||
        Object.keys(fieldManuallySetErrors).includes(slug)
      const errorMessage =
        fieldValidationErrors?.[slug] ||
        fieldManuallySetErrors?.[slug] ||
        "Campo inválido"

      const FieldComponent = getFieldComponent({
        widgetName,
        customTheme: safeTheme,
      })
      const fieldsPropsConditional = getConditionalProps({
        formPayload,
        propsConditional,
      })

      // all fields receives this props by default
      const commonFieldsProps = {
        isRequired: isRequiredField,
        isOptional: isOptionalField,
        payload: formPayload,
        slug,
        errorMessage,
        isValid: !hasError,
        hasError,
        onChange: getFieldEvent.onChange(field),
        onBlur: getFieldEvent.onBlur(field),
        onFocus: getFieldEvent.onFocus(field),
        modifyPayloadKeys,
        value,
        fieldValidators,
        meta,
        fieldId,
        manuallySetFieldError: (message) =>
          setFieldWarning(slug, message, true),
        clearManuallySetError: () => clearFieldWarning(slug, true),
      }

      const standalonePropsPresetsMap =
        (() => {
          if (!standalonePropsPresets) return {}
          return getFieldProps(
            field,
            standalonePropsPresets.collectionsMap,
            standalonePropsPresets.allPresetsMap
          )
        })() || {}

      const componentProps = {
        ...propsFromSchema,
        ...standalonePropsPresetsMap,
        ...fieldsPropsConditional,
        ...commonFieldsProps,
      }

      if (!shouldHideField) {
        return (
          <InputHolder
            fieldConfig={field}
            FieldComponent={FieldComponent}
            key={`form-item-${index}`}
            fieldProps={componentProps}
          />
        )
      }
    }
  )

  // join field widgets with form inserts
  const formChildren = remapFormChildren({
    fieldsChildren,
    insertsChildren,
  })

  return { formChildren }
}
