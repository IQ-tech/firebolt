import { ValidationResult } from '../../classes';
import validate, { ValidateArgs } from '../validate';

interface GroupValidationField {
  fieldIndex: number;
  validationResult: ValidationResult;
}

interface ValidationGroupResult {
  allFieldsValid: boolean;
  invalidFields: GroupValidationField[];
}

export default function validateGroup(
  validationGroup: ValidateArgs[] | [] = [],
): ValidationGroupResult {
  const invalidFields = validationGroup
    .map(
      (item: ValidateArgs, index: number): GroupValidationField => ({
        fieldIndex: index,
        validationResult: validate(...item),
      }),
    )
    .filter((item) => !item.validationResult.isValid);

  const hasInvalidFields = invalidFields.length > 0;

  return {
    allFieldsValid: !hasInvalidFields,
    invalidFields,
  };
}
