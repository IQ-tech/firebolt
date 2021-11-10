import evaluate from 'simple-evaluate';
import validateFBTField from '../validateFBTField';
import {
  FieldConfig,
  FormPayload,
  ValidationContext,
  InvalidField,
} from '../../types';

/** Firebolt fields defined on json data */
interface ValidateFBTStepArgs {
  stepFields: FieldConfig[];
  formPayload: FormPayload;
  context?: ValidationContext;
}

export interface ValidateFBTStepResult {
  isValid: boolean;
  invalidFields: InvalidField[];
}

export default function validateFBTStep({
  stepFields,
  formPayload,
  context,
}: ValidateFBTStepArgs): ValidateFBTStepResult {
  const invalidFields = stepFields.reduce(
    (acc: InvalidField[], field: FieldConfig) => {
      const fieldConditional = field?.conditional || '';
      const isConditionalField = !!fieldConditional;
      const isConditionallyValid = isConditionalField
        ? evaluate({ step: formPayload }, fieldConditional)
        : true;
      const fieldHasValidators = !!field?.validators;
      if (fieldHasValidators && isConditionallyValid) {
        const fieldValidation = validateFBTField({
          field,
          formPayload,
          context,
        });

        if (!fieldValidation.isValid) {
          const invalidResult: InvalidField = {
            slug: field.slug,
            validationResults: fieldValidation.invalidValidations || [],
          };
          return [...acc, invalidResult];
        }
        return acc;
      } else {
        return acc;
      }
    },
    [],
  );

  const hasInvalidFields = !!invalidFields.length;

  return {
    isValid: !hasInvalidFields,
    invalidFields,
  };
}
