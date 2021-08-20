import { Validator, ValidationResult } from '../../classes';

function isNonSequential(value: string | number) {
  const isString = typeof value === 'string';
  const isNumber = typeof value === 'number';
  const hasValue = !!value;

  const isValidType = !hasValue || !isString || !isNumber;
  if (!isValidType) return new ValidationResult(true);
  const stringfied = String(value);

  const isSingleValue = stringfied.length === 1;
  if (isSingleValue) return new ValidationResult(true);

  const splittedValue = stringfied.split('');
  const isSequential = splittedValue.every((char, i) => {
    const isLastItem = i === splittedValue.length - 1;
    const nextChar = splittedValue[i + 1] || '';
    const nextCharCode = nextChar.charCodeAt(0);
    const currentCharcode = char.charCodeAt(0);
    const isSmallerThanNext = currentCharcode === nextCharCode - 1;

    return isLastItem || isSmallerThanNext;
  });

  const isValid = !isSequential;
  const message = isValid
    ? ''
    : 'O campo não deve conter caracteres sequenciais';

  return new ValidationResult(isValid, message);
}

export default new Validator(isNonSequential);
