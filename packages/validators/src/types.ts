import { ValidationResult } from './classes';

export interface ValidatorConfig {
  /** Validator name */
  type: string;
  /** Should run on specific context */
  context?: ValidationContext;
  /** Validator props */
  properties?: {
    [key: string]: any;
  };
}

export interface FormPayload {
  [fieldSlug: string]: any;
}

export type ValidationContext = 'server' | 'client';

export interface FieldConfig {
  [key: string]: any;
  slug: string;
  conditional?: string;
  validators?: ValidatorConfig[];
}

export interface InvalidField {
  slug: string;
  validationResults: ValidationResult[];
}


export interface ValidateFBTStepResult {
  isValid: boolean;
  invalidFields: InvalidField[];
}