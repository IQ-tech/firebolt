export interface IRuleMapItem {
  mainFunction: () => void //todo
  errorMessages: {
    [errorId: string]: string // error message
  }
  properties: {
    [propertyName: string]: string //default value
  }
}

export interface IRulesMap {
  [ruleId: string]: IRuleMapItem
}

export interface IErrorCasesMap {
  [errorCaseID: string]: string
}

export interface IValidationValueResult {
  isValid: boolean
  message?: string
  givenValue: any
}

export interface IValidationFunctionOptions<EM = {}, P = {}> {
  errorsMap?: EM
  properties?: P
}

export type GenericValidationFunc = (
  givenValue: any,
  options: IValidationFunctionOptions
) => IValidationValueResult
export interface ICustomValidationRulesMap {
  [validatorKey: string]: GenericValidationFunc
}

export interface IFBTFieldValidationResult {
  isValid: boolean
  invalidValidations?: IValidationValueResult[]
}
