import { Validator, ValidationResult } from '../../classes';

function isRequired(value = ''): ValidationResult {
  const isBoolean = typeof value === 'boolean';
  const isNumber = typeof value === 'number';
  const hasValue = isBoolean || isNumber || !!value; // filter '', null, undefined
  const isObj = hasValue && (typeof value === 'object' || Array.isArray(value));
  const isEmptyObj = isObj && Object.keys(value).length === 0; // filter [], {}
  const isValid = hasValue && !isEmptyObj;
  const message = isValid ? '' : 'Esse campo é obrigatório';

  return new ValidationResult(isValid, message);
}

export default new Validator(isRequired);
