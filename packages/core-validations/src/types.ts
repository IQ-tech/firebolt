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

export interface IGenericObject<T = any> {
  [key: string]: T
}

export interface IValidationFunctionOptions<EM = IGenericObject, P = IGenericObject> {
  errorsMap?: EM
  properties?: P
}

export type GenericValidationFunc<EM = IGenericObject, P = IGenericObject> = (
  givenValue: any,
  options?: IValidationFunctionOptions<EM, P>
) => IValidationValueResult

export interface ICustomValidationRulesMap {
  [validatorKey: string | number | symbol]: GenericValidationFunc
}

export interface IFBTFieldValidationResult {
  isValid: boolean
  invalidRules?: IValidationValueResult[]
}
