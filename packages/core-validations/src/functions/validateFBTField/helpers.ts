import { IFBTFieldValidationResult } from "../../types"
import {
  ExperienceContext,
  IFieldValidationRuleConfig,
  IStepFormPayload,
} from "@iq-firebolt/entities"


export function getInvalidRequired(value: any): IFBTFieldValidationResult {
  return {
    isValid: false,
    invalidValidations: [
      { isValid: false, message: "this value is required", givenValue: value },
    ],
  }
}

export function filterRulesByContext(
  validationRules: IFieldValidationRuleConfig[],
  context: ExperienceContext
) {
  return validationRules.filter(({ context: ruleContext = "all" }) => {
    const shouldUseFieldContext =
      !!ruleContext && typeof ruleContext === "string" && ruleContext !== "all"

    const matchesWithCurrentContext = ruleContext === context
    const bypassValidator = shouldUseFieldContext && !matchesWithCurrentContext
    return !bypassValidator
  })
}

/**
 * Replaces dynamic value on validation rule properties
 * it takes the value from another filled field on the currente firebolt step form
 * in the example, it will try to get the value from the field called 'wordSize'
 * @example
 * {"rule": "wordsLength", "properties": {"maxWordLength": "step.wordsSize"}}
 */
export function processProperties(
  properties: { [key: string]: any },
  formPayload: IStepFormPayload
): { [key: string]: any } {
  const propertiesKeys = Object.keys(properties)
  return propertiesKeys.reduce((acc, key: string) => {
    const value = properties[key]
    const referenceBase = "step."
    const cleannedValue = String(value).replace(/ /g, "")
    const referenceAnotherField =
      typeof value === "string" && cleannedValue.indexOf(referenceBase) === 0

    if (referenceAnotherField) {
      const refFieldSlug = cleannedValue.replace(referenceBase, "")
      const hasRefField = Object.keys(formPayload).includes(refFieldSlug)
      if (!hasRefField) return { ...acc }
      const referencedValue = formPayload[refFieldSlug]

      return {
        ...acc,
        [key]: referencedValue,
      }
    } else {
      return {
        ...acc,
        [key]: value,
      }
    }
  }, {})
}
