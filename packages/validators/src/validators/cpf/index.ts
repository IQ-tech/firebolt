import { cpf } from 'cpf-cnpj-validator';
import { ValidationResult, Validator } from '../../classes';

function isCpf(value: string): ValidationResult {
  if (!value) {
    return new ValidationResult(true);
  }

  const hasSpecialChar = value.replace(/[._-]+/gi, '').match(/^(.)\1+$/);
  const isValid = !hasSpecialChar && cpf.isValid(value);
  const validationMessage = isValid ? 'CPF válido' : 'CPF inválido';

  return new ValidationResult(isValid, validationMessage);
}

export default new Validator(isCpf);
