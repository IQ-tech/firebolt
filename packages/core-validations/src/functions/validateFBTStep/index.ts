import { ExperienceContext, IStepConfig, IStepFormPayload } from '@iq-firebolt/entities';
import evaluate from 'simple-evaluate';
import { ICustomValidationRulesMap, IGenericObject, IValidationValueResult } from '../../types';
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
export default function validateFBTStep({context = "all"}: IValidateFBTStepArgs): IStepValidationResult{
  return {} as IStepValidationResult
}