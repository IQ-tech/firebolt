import { ValidationResult, Validator } from '../../classes';

function hasSpecialCharacters(text = ''): ValidationResult {
  if (!text) return new ValidationResult(true);
  const isValid = !text.trim().match(/[~!@#$%^&*()_+=`{}[\]|\\:;'<>,./?]/gi);
  const message = isValid
    ? ''
    : 'Esse campo não deve conter caracteres especiais';

  return new ValidationResult(isValid, message);
}

export default new Validator(hasSpecialCharacters);
