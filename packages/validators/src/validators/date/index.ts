import { ValidationResult, Validator } from '../../classes';
import isDayValid from '../day';

interface ValidationProp {
  partialDate?: boolean;
}

function isDate(
  value: string,
  { partialDate = false }: ValidationProp = {},
): ValidationResult {
  if (!value) return new ValidationResult(true);
  const parms = value.split('/');

  const year = partialDate ? parseInt(parms[1], 10) : parseInt(parms[2], 10);
  const month = partialDate ? parseInt(parms[0], 10) : parseInt(parms[1], 10);
  const day = partialDate ? 1 : parseInt(parms[0], 10);
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentDay = currentDate.getUTCDate();
  const currentMonth = currentDate.getUTCMonth() + 1;

  if (!isDayValid.run(day).isValid) {
    return new ValidationResult(false, 'Dia inválido');
  }

  if (month > 12) {
    return new ValidationResult(false, 'Mês inválido');
  }

  if (
    year > currentYear ||
    year < 1900 ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  ) {
    return new ValidationResult(false, 'Ano inválido');
  }

  const reference = new Date(year, month - 1, day);
  const refYear = reference.getUTCFullYear();
  const refDay = reference.getUTCDate();
  const refMonth = reference.getUTCMonth() + 1;

  if (refYear !== year || refMonth !== month || refDay !== day) {
    return new ValidationResult(false);
  }

  return new ValidationResult(true);
}

export default new Validator<ValidationProp>(isDate);
