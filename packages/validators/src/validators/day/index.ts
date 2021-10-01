import { ValidationResult, Validator } from '../../classes';

function isDayValid(value: number): ValidationResult {
  const isANumber = typeof value === 'number';
  const isEmptyValue = !value && !isANumber;

  if (isEmptyValue) {
    return new ValidationResult(true);
  }

  const isFloatNumber = isANumber && !Number.isInteger(value);
  const numberFormatted = typeof value === 'string' ? parseInt(value) : value;
  const minDay = 1;
  const maxDay = 31;
  const isBiggerThanMinDay = numberFormatted >= minDay;
  const isSmallerThanMaxDay = numberFormatted <= maxDay;
  const isValidDay =
    !isFloatNumber && isBiggerThanMinDay && isSmallerThanMaxDay;

  const message = isValidDay ? '' : 'Dia inválido';

  return new ValidationResult(isValidDay, message);
}

export default new Validator(isDayValid);
