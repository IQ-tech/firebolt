import { cnpj } from 'cpf-cnpj-validator';
import { ValidationResult, Validator } from '../../classes';

function isCnpj(value: string): ValidationResult {
  const isValid = cnpj.isValid(value);

  if (isValid) {
    return new ValidationResult(true);
  } else {
    return new ValidationResult(false, 'Formato de CNPJ inválido');
  }
}

export default new Validator(isCnpj);
