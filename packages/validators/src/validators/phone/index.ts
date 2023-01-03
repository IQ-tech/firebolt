import { Validator, ValidationResult } from '../../classes';

function isPhoneValid(value = ''): ValidationResult {
  const safeValue = value || '';
  const validObj = new ValidationResult(true);
  const invalidObj = new ValidationResult(false, 'Telefone inválido');

  if (!value) return validObj;

  const stringfied = `${safeValue}`;
  const hasInvalidChars = (stringfied || '').split('').every((char) => {
    const isANumber = /^\d+$/.test(char);
    const isAParenthesis = char === '(' || char === ')';
    const isADash = char === '-';
    const isASpace = char === ' ';
    return isANumber || isAParenthesis || isADash || isASpace;
  });

  if (!hasInvalidChars) return invalidObj;
  const onlyNums = stringfied.replace(/\D/g, '');
  if (!(onlyNums.length >= 10 && onlyNums.length <= 11)) return invalidObj;

  if (onlyNums.length === 11 && parseInt(onlyNums.substring(2, 3)) !== 9) {
    return invalidObj;
  }

  for (let n = 0; n < 10; n++) {
    const strN = String(n);
    if (
      onlyNums === new Array(11).join(strN) ||
      onlyNums === new Array(12).join(strN)
    ) {
      return invalidObj;
    }
  }

  const validationString = onlyNums
  const regexValidation = /^\d{3}(\d)\1{7}$/;
  const validationResult = regexValidation.test(validationString);

  if (onlyNums.length === 11 && validationResult) {
    return invalidObj;
  }

  const validDDD = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  if (validDDD.indexOf(parseInt(onlyNums.substring(0, 2))) === -1) {
    return invalidObj;
  }

  return validObj;
}

export default new Validator(isPhoneValid);
