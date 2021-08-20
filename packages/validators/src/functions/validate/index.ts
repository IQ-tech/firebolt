import { ValidationResult } from '../../classes';
import validators from '../../validators';

export type ValidateArgs = [
  validatorName: string,
  valueToTest: any,
  properties?: { [key: string]: any },
];

interface ValidateResult extends ValidationResult {
  validator: string;
}

export default function validate(...args: ValidateArgs): ValidateResult {
  const [validatorName, valueToTest, properties] = args;
  const validatorToUse = validators[validatorName];

  if (!validatorToUse) {
    throw new Error(
      `Validator of type ${validatorName} does not exist, check validator name or lib version`,
    );
  } else if (typeof validatorName !== 'string') {
    throw new TypeError('Invalid datatype to validator name, expected string');
  }

  return {
    ...validatorToUse.run(valueToTest, properties),
    validator: validatorName,
  };
}
