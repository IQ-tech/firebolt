import { Validator, ValidationResult } from '../../classes';
import isMinAge from '../minAge';

function isOfLegalAge(value = ''): ValidationResult {
  if (!value) return new ValidationResult(true);

  const isValid = isMinAge.run(value, { minAge: 18 }).isValid;
  const message = isValid ? '' : '';

  return new ValidationResult(isValid, message);
}

export default new Validator(isOfLegalAge);
