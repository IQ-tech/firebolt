import { Validator, ValidationResult } from '../../classes';

export interface TextCharsLengthProps {
  minValue?: number;
  maxValue?: number;
  exact?: number;
}

function textCharsLength(value: string, properties: TextCharsLengthProps = {}) {
  if (!value) {
    return new ValidationResult(true);
  }

  if (typeof value !== 'string') {
    return new ValidationResult(false, 'Tipo de dado inválido');
  }

  const { minValue, maxValue, exact } = properties;
  const valueCharLength = value.split('').length;

  if (!!minValue && valueCharLength < minValue) {
    return new ValidationResult(
      false,
      `Valor é menor que o número minimo de caracteres ${minValue}`,
    );
  }

  if (!!maxValue && valueCharLength > maxValue) {
    return new ValidationResult(
      false,
      `Valor é maior que o número de caracteres permitidos ${maxValue}`,
    );
  }

  if (!!exact) {
    if (valueCharLength > exact) {
      return new ValidationResult(
        false,
        `O valor excede o limite de ${exact} caracteres`,
      );
    } else if (valueCharLength < exact) {
      return new ValidationResult(
        false,
        `O valor deve conter ${exact} caracteres`,
      );
    } else {
      return new ValidationResult(true);
    }
  }

  return new ValidationResult(true);
}

export default new Validator<TextCharsLengthProps>(textCharsLength, {
  minValue: 0,
  maxValue: 30,
});
