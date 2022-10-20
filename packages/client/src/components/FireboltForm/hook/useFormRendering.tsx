import React from "react"
import evaluate from "simple-evaluate"
import { IStepConfigField } from "@iq-firebolt/client-core/lib"
import getFieldComponent from "./helpers/getFieldComponent"
import remapFormChildren from "./helpers/remapFormChildren"
import InputHolder from "../InputHolder"

export default function useFormRendering({
  schema,
  theme,
  children: insertsChildren,
  formPayload,
  modifyPayloadKeys,
  fieldValidationErrors,
  fieldManuallySetErrors,
  setFieldWarning,
  clearFieldWarning,
  standalonePropsPresets,
  hasFormChanged,
  setHasFormChanged,
  onFocusField,
  onChangeField,
  onBlurField,
  classes,
  clearRemoteFieldError,
  remoteErrors
}) {
  // get correct widgets components
  const fieldsChildren = schema.map(
    (field: IStepConfigField = {} as IStepConfigField, index: number) => {
      const { conditional, "ui:widget": widgetName } = field
      const safeTheme = theme || {}
      const hasConditionalRender = !!conditional
      const isConditionallyValid = hasConditionalRender
        ? evaluate({ step: formPayload }, conditional)
        : true
      const shouldHideField = widgetName === "hidden" || !isConditionallyValid
      const fieldValidators = field?.validators || []
      const isRequiredField = !!fieldValidators.find(
        (validator: { type: string }) => validator?.type === "required"
      )
      const FieldComponent = getFieldComponent({
        widgetName,
        customTheme: safeTheme,
      })

      if (!shouldHideField) {
        return (
          <InputHolder
            fieldConfig={field}
            formPayload={formPayload}
            FieldComponent={FieldComponent}
            key={`form-item-${index}`}
            hasFormChanged={hasFormChanged}
            setHasFormChanged={setHasFormChanged}
            modifyPayloadKeys={modifyPayloadKeys}
            clearFieldWarning={clearFieldWarning}
            setFieldWarning={setFieldWarning}
            onFocusField={onFocusField}
            onBlurField={onBlurField}
            onChangeField={onChangeField}
            classes={classes}
            fieldManuallySetErrors={fieldManuallySetErrors}
            fieldValidationErrors={fieldValidationErrors}
            isRequiredField={isRequiredField}
            standalonePropsPresets={standalonePropsPresets}
            clearRemoteFieldError={clearRemoteFieldError}
            remoteErrors={remoteErrors}
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