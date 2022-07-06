import {
  IFieldConfig,
  IStepFormPayload,
  ExperienceContext,
} from "@iq-firebolt/entities"
import { IValidationValueResult } from "../../types"

interface IValidateFBTField {
  fieldConfig: IFieldConfig
  value: any
  formPayload?: IStepFormPayload
  context?: ExperienceContext
}

interface IFBTFieldValidationResult {
  isValid: boolean
  invalidValidations?: IValidationValueResult[]
}

function validateFBTField({
  fieldConfig,
  value,
  formPayload = {},
  context = "all",
}: IValidateFBTField): IFBTFieldValidationResult {
  const fieldIsRequired = fieldConfig.required

  return {}
}

export default validateFBTField
