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

