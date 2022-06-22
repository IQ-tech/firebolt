import { validateFBTField } from "@iq-firebolt/validators/src"
import { IStepConfigField } from "@iq-firebolt/client-core/lib"
import evaluate from "simple-evaluate"

export function getConditionalProps({ propsConditional, formPayload }) {
  if (!propsConditional) return {}
  const safePropsConditional = propsConditional || []

  return safePropsConditional.reduce(
    (acc, { conditional = "", props = {} }) => {
      const isConditionValid = evaluate({ step: formPayload }, conditional)
      return {
        ...acc,
        ...(isConditionValid ? { ...props } : {}),
      }
    },
    {}
  )
}

interface IvalidateField {
  value: string
  field: IStepConfigField
  formPayload: { [fieldSlug: string]: any }
}
export function validateField({ value, field, formPayload }: IvalidateField) {
  return validateFBTField({
    value,
    field,
    formPayload,
    context: "client",
  })
}
