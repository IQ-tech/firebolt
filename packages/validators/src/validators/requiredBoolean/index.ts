import { Validator, ValidationResult } from '../../classes';

function isRequiredBoolean(value = false): ValidationResult {
  const isValid = value === true ? true : false;
  const message = isValid ? '' : 'Esse campo é obrigatório';

  return new ValidationResult(isValid, message);
}

export default new Validator(isRequiredBoolean);
