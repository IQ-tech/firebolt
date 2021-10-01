import { Validator, ValidationResult } from '../../classes';

interface INumberRangeArgs {
  minNumber?: number;
  maxNumber?: number;
  decimalSymbol?: string;
  thousandsSeparatorSymbol?: string;
  abovePermitedValueMessage?: string;
  underPermitedValueMessage?: string;
}
// custom message
function numberRange(
  value: any,
  {
    minNumber = 0,
    maxNumber,
    decimalSymbol = ',',
    thousandsSeparatorSymbol,
    abovePermitedValueMessage,
    underPermitedValueMessage,
  }: INumberRangeArgs,
) {
  if (!value && typeof value !== 'number') return new ValidationResult(true);

  const stringfiedValue = String(value);
  const onlyNumbers = stringfiedValue.replace(/[^0-9,.]/g, '');
  const withoutThousandSeparator = !!thousandsSeparatorSymbol
    ? onlyNumbers.replace(thousandsSeparatorSymbol, '')
    : onlyNumbers;
  const withDecimalPoint = withoutThousandSeparator.replace(decimalSymbol, '.');
  const formatted = Number(withDecimalPoint);

  if (
    (typeof minNumber === 'number' || typeof minNumber === 'string') &&
    formatted < Number(minNumber)
  ) {
    const message =
      underPermitedValueMessage || 'O número recebido é menor que o permitido';
    return new ValidationResult(false, message);
  }

  if (
    (typeof maxNumber === 'number' || typeof maxNumber === 'string') &&
    formatted > Number(maxNumber)
  ) {
    const message =
      abovePermitedValueMessage || 'O número recebido é maior que o permitido';
    return new ValidationResult(false, message);
  }

  return new ValidationResult(true);
}

export default new Validator(numberRange);
