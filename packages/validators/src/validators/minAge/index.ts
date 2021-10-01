import { ValidationResult, Validator } from '../../classes';

import dateFormat from '../../utils/dateFormat';
import isDate from '../date';

export interface IsMinAgeProps {
  minAge: string | number;
}

function isMinAge(value: string, properties: IsMinAgeProps): ValidationResult {
  const { minAge } = properties;

  if (!value) {
    return new ValidationResult(true);
  }

  if (!isDate.run(dateFormat(value)).isValid) {
    return new ValidationResult(false, 'Data inválida');
  }

  const minAgeNumber = typeof minAge === 'string' ? parseInt(minAge) : minAge;
  const today = new Date();
  const dateValues = value.split('/');
  const [birthDay, birthMonth, birthYear] = dateValues.map(Number);
  const birthDate = new Date(+birthYear, birthMonth - 1, birthDay);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  const isBirthdayThisMonth = month === 0;
  const notPassedBirthdayThisYear = month < 0;
  const isBirthdayToday = today.getUTCDate() < birthDate.getUTCDate();
  if (notPassedBirthdayThisYear || (isBirthdayToday && isBirthdayThisMonth)) {
    age -= 1;
  }

  const isValid = age >= minAgeNumber;

  return new ValidationResult(isValid);
}

export default new Validator<IsMinAgeProps>(isMinAge, { minAge: 0 });
