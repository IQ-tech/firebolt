import { Validator, ValidationResult } from '../../classes';

function isNonNumeric(value = ''): ValidationResult {
  const isValid = !/\d/gi.test(value);
  const message = isValid
    ? ''
    : 'Caracteres não númericos não são aceitos nesse campo';
  return new ValidationResult(isValid, message);
}

export default new Validator(isNonNumeric);
