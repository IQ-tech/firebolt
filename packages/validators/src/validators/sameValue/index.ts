import { Validator, ValidationResult } from '../../classes';

interface SameValueArgs {
  valueToCompare?: any;
  typeStrict?: boolean;
}

function isSameValue(
  value: any,
  { valueToCompare, typeStrict = true }: SameValueArgs,
) {
  const areStrings =
    typeof value === 'string' && typeof valueToCompare === 'string';
  if ((!value || !valueToCompare) && !areStrings) {
    return new ValidationResult(false);
  }

  const mismatchError = 'Os valores não são iguais';

  if (!!typeStrict) {
    if (value === valueToCompare) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, mismatchError);
    }
  } else {
    if (value == valueToCompare) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, mismatchError);
    }
  }
}

export default new Validator<SameValueArgs>(isSameValue);
