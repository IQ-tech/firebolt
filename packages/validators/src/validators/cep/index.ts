import { Validator, ValidationResult } from '../../classes';

function isCepValid(value = ''): ValidationResult {
  if (!value) return new ValidationResult(true);

  const onlyDigitsValues = value.match(/\d+/gi);
  const result = onlyDigitsValues ? onlyDigitsValues.join('') : null;

  if (result && !/^(.)\1+$/.test(value.replace(/[\D]/, ''))) {
    return new ValidationResult(result.length === 8);
  }

  return new ValidationResult(false);
}

export default new Validator(isCepValid);
