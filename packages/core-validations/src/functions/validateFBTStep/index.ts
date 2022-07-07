import {
  ExperienceContext,
  IStepConfig,
  IStepFormPayload,
} from "@iq-firebolt/entities"
import evaluate from "simple-evaluate"
import {
  ICustomValidationRulesMap,
  IFBTFieldValidationResult,
  IGenericObject,
  IValidationValueResult,
} from "../../types"
import validateFBTField from "../validateFBTField"

// TODO: add context on engine constructor
interface IValidateFBTStepArgs {
  stepConfig: IStepConfig
  formPayload: IStepFormPayload
  context?: ExperienceContext
  customValidatorsMap?: ICustomValidationRulesMap | IGenericObject
  locale?: any // todo
}

interface IInvalidField {
  fieldSlug: string
  invalidRules: IValidationValueResult[]
}

interface IStepValidationResult {
  isValid: boolean
  invalidFields: IInvalidField[]
}
export default function validateFBTStep({
  stepConfig,
  formPayload,
  customValidatorsMap,
  locale,
  context = "all",
}: IValidateFBTStepArgs): IStepValidationResult {
  if (stepConfig.type !== "form") {
    return { isValid: true, invalidFields: [] }
  }

  const safeStepFields = stepConfig.fields || []

  // filter - sem required e sem value
  const withoutEmptyOptional = safeStepFields.filter((field) => {
    const { required, slug } = field
    const fieldValue = formPayload[slug]
    const shouldBeValidated = required || fieldValue
    return shouldBeValidated
  })

  // filter - required type string e a expressão retorna false
  const withoutConditionalInvalid = withoutEmptyOptional.filter((field) => {
    const { required } = field
    const isConditional = typeof required === "string"
    if (isConditional) {
      const isConditionallyValid = evaluate({ step: formPayload }, required)
      return isConditionallyValid
    }
    return true
  })

  const invalidFields: IInvalidField[] = withoutConditionalInvalid.reduce(
    (acc, fieldConfig) => {
      const validationResult = validateFBTField({
        fieldConfig,
        formPayload,
        context,
        customValidatorsMap,
        locale,
      })

      const isValid = validationResult.isValid
      if (!isValid) {
        const invalidField: IInvalidField = {
          fieldSlug: fieldConfig.slug,
          invalidRules: validationResult.invalidRules || [],
        }
        return [...acc, invalidField]
      }
      return acc
    },
    [] as IInvalidField[]
  )

  return { isValid: !invalidFields.length, invalidFields }
}
