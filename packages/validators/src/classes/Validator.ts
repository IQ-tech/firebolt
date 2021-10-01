import ValidationResult from './ValidationResult';

/* type ValidationFunction<T = {}> = (
  value: any,
  properties: T | undefined,
) => ValidationResult; */

type ValidationFunction<T = {}> = (...args: any) => ValidationResult;

class Validator<T = {}> {
  private validatorFunction: ValidationFunction<T>;
  private displayPropertiesValues?: T;

  constructor(
    validatorFunction: ValidationFunction,
    displayPropertiesValues?: T,
  ) {
    this.validatorFunction = validatorFunction;
    this.displayPropertiesValues = displayPropertiesValues;
  }

  get displayProperties() {
    return this.displayPropertiesValues || {};
  }

  get displayPropertiesList(): string[] {
    if (this.displayPropertiesValues) {
      return Object.keys(this.displayPropertiesValues) || [];
    } else {
      return [];
    }
  }

  run(value: any, properties?: T): ValidationResult {
    return this.validatorFunction(value, properties);
  }
}

export default Validator;
