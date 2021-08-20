import { ValidationResult, Validator } from '../../classes';

function isNumeric (number = '') {
  if (!number) return new ValidationResult(false);

  const isValid = /^[0-9]*$/.test(number)

  const message = isValid
    ? ''
    : 'Esse campo só aceita números';

  return new ValidationResult(isValid, message);
}

export default new Validator(isNumeric);