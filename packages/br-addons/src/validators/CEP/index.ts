import { createValidationRule } from "@iq-firebolt/validate"

const CEP = createValidationRule(
  ({ value, action }) => {
    const onlyDigitsValues = value.match(/\d+/gi)
    const result = onlyDigitsValues ? onlyDigitsValues.join("") : null

    if (result && !/^(.)\1+$/.test(value.replace(/[\D]/, ""))) {
      const hasEightDigits = result?.length === 8
      if (hasEightDigits) return action.approve()
      else return action.refuse("defaultError")
    }

    return action.refuse("defaultError")
  },
  {
    "defaultError": "o CEP #{value} não é valido",
  }
)

export default CEP
