import processProperties from './helpers/processProperties';
import { ValidationResult } from '../../classes';
import validate from '../validate';
import { FieldConfig, FormPayload, ValidationContext } from '../../types';

interface ValidateSingleFieldArgs {
  field: FieldConfig;
  formPayload: FormPayload;
  context?: ValidationContext;
}

interface FieldValidationResult {
  isValid: boolean;
  validationsResults: ValidationResult[];
  invalidValidations?: ValidationResult[];
}

export default function validateFBTField({
  field,
  formPayload,
  context,
}: ValidateSingleFieldArgs): FieldValidationResult {
  const fieldSlug: string = field.slug;
  const validators = field.validators || [];

  const payloadData = formPayload[fieldSlug];

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
        ? processProperties(properties, formPayload)
        : properties;
      const validation = validate(type, payloadData, processedProperties);
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
