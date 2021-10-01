import { Validator, ValidationResult } from '../../classes';

interface NonRepeatedCharsProperties {
  /** Check if a given string has a substring of repeated chars */
  subStr?: number;
}

function nonRepeatedChars(
  value: string | number,
  { subStr }: NonRepeatedCharsProperties = {},
) {
  const isString = typeof value === 'string';
  const isNumber = typeof value === 'number';
  const hasValue = !!value;

  const isValidType = !hasValue || !isString || !isNumber;
  if (!isValidType) return new ValidationResult(true);
  const stringfied = String(value);

  const shouldCheckSubstr =
    !!subStr && !Number.isNaN(Number(subStr)) && subStr !== 1;

  if (shouldCheckSubstr && !!subStr) {
    const regexToCheck = new RegExp(`(.)\\1{${subStr - 1},}`);
    const charRepeats = regexToCheck.test(stringfied);
    const isValid = !charRepeats;

    return new ValidationResult(isValid);
  }

  const repeatedCharsRegex = /^(.)\1+$/;
  const hasOnlyTheSameChar = repeatedCharsRegex.test(stringfied);
  const isValid = !hasOnlyTheSameChar;
  const message = isValid ? '' : 'O campo não deve conter caracteres repetidos';

  return new ValidationResult(isValid, message);
}

export default new Validator(nonRepeatedChars);
