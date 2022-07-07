import {
  IFieldConfig,
  IStepFormPayload,
  ExperienceContext,
} from "@iq-firebolt/entities"
import rulesMap from "../../rulesMap"
import {
  ICustomValidationRulesMap,
  IFBTFieldValidationResult,
  GenericValidationFunc,
  IGenericObject,
} from "../../types"

import {
  getInvalidRequired,
  filterRulesByContext,
  processProperties,
} from "./helpers"

interface IValidateFBTFieldBase {
  fieldConfig: IFieldConfig
  customValidatorsMap?: ICustomValidationRulesMap | IGenericObject
  locale?: any

  context?: ExperienceContext
}

interface IValidateFBTFieldPayload extends IValidateFBTFieldBase {
  formPayload: IStepFormPayload
  value?: any
}

interface IValidateFBTFieldValue extends IValidateFBTFieldBase {
  value: any
  formPayload?: IStepFormPayload
}

type IValidateFBTField = IValidateFBTFieldValue | IValidateFBTFieldPayload

function validateFBTField({
  fieldConfig,
  value,
  formPayload = {},
  context = "all",
  customValidatorsMap,
  locale,
}: IValidateFBTField): IFBTFieldValidationResult {
  const fieldIsRequired = fieldConfig.required

  if (fieldIsRequired && !value) {
    return getInvalidRequired(value)
  }

  if (!fieldIsRequired && !value) {
    return { isValid: true }
  }

  const validationRules = fieldConfig.validation || []
  const fieldSlug = fieldConfig.slug
  const fieldValue = value || formPayload?.[fieldSlug]

  const filteredContextValidations = filterRulesByContext(
    validationRules,
    context
  )

  const validationsResults = filteredContextValidations.map(
    ({ rule, properties, errorsMap }) => {
      const cleanneadRuleName = rule.replace(/ /g, "")
      const isCoreRule = cleanneadRuleName.startsWith("core:")
      const processedProperties = !!properties
        ? processProperties(properties, formPayload)
        : properties
      if (isCoreRule) {
        const ruleId = cleanneadRuleName.replace("core:", "")
        const ruleValidation: GenericValidationFunc = (rulesMap as any)[ruleId]
        // localization map
        if (!ruleValidation) {
          throw new TypeError(
            `rule validation ${ruleId} does not exists on firebolt core validation rules`
          )
        }
        return ruleValidation(fieldValue, { properties: processedProperties })
      } else {
        const customValidator = customValidatorsMap?.[cleanneadRuleName]
        if (!customValidator) {
          throw new TypeError(
            `rule validation ${cleanneadRuleName} does not exists on firebolt or name is wrongly configured`
          )
        }
        return customValidator(fieldValue, { properties: processedProperties })
      }
    }
  )
  const invalidRules = validationsResults.filter(
    (result) => !result.isValid
  )
  const isValid = invalidRules.length === 0

  return { isValid, invalidRules }
}

export default validateFBTField
