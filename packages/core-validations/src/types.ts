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

//// >>>>>>>

// import  ValidationResult from './ValidationResult';

// export interface ValidatorConfig {
//   /** Validator name */
//   type: string;
//   /** Should run on specific context */
//   context?: ValidationContext;
//   /** Validator props */
//   properties?: {
//     [key: string]: any;
//   };
// }

// export interface FormPayload {
//   [fieldSlug: string]: any;
// }

// export type ValidationContext = 'server' | 'client';

// export interface FieldConfig {
//   [key: string]: any;
//   slug: string;
//   conditional?: string;
//   validators?: ValidatorConfig[];
// }

// export interface InvalidField {
//   slug: string;
//   validationResults: ValidationResult[];
// }
