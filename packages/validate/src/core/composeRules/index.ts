import { ILocaleConfig } from "../../locales/types"
import { GenericValidationFunc, IValidationValueResult } from "../../types"

type Rule = (...args: any[]) => IValidationValueResult
type ReturnFunc = (givenValue: string) => IValidationValueResult

function composeRules(...rules: Rule[]): ReturnFunc {
  return (givenValue) => {
    for (let c = 0; c < rules?.length; c++) {
      const rule = rules[c]
      const validationResult = rule(givenValue)

      if (validationResult.isValid === false) {
        return validationResult
      }
    }

    return { isValid: true, givenValue }
  }
}

export default composeRules
