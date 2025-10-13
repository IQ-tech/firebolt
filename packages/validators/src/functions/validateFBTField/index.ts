import processProperties from './helpers/processProperties';
import { ValidationResult } from '../../classes';
import validate from '../validate';
import { FieldConfig, FormPayload, ValidationContext } from '../../types';

interface ValidateSingleFieldArgs {
  field: FieldConfig;
  formPayload: FormPayload;
  context?: ValidationContext;
  value?: String | Number | undefined;
}

export interface FieldValidationResult {
  isValid: boolean;
  validationsResults: ValidationResult[];
  invalidValidations?: ValidationResult[];
}

export default function validateFBTField({
  field,
  formPayload,
  context,
  value,
}: ValidateSingleFieldArgs): FieldValidationResult {
  const fieldSlug: string = field.slug;
  const validators = field.validators || [];

  const fieldValue = value ? value : formPayload[fieldSlug];

  const filteredContextValidations = validators.filter(
    ({ context: validationContext }) => {
      const shouldUseFieldContext =
        !!validationContext && typeof validationContext === 'string';
      const isSameContext = validationContext === context;
      const bypassValidator = shouldUseFieldContext && !isSameContext;
      return !bypassValidator;
    },
  );

  const validationsResults = filteredContextValidations.map(
    ({ type, properties }) => {
      const processedProperties = !!properties
        ? processProperties(properties, field, formPayload)
        : properties;
      const validation = validate(type, fieldValue, processedProperties);
      return validation;
    },
  );

  const invalidValidations = validationsResults.filter(
    (result) => !result.isValid,
  );
  const isValid = invalidValidations.length === 0;

  return {
    isValid,
    validationsResults,
    invalidValidations,
  };
}
