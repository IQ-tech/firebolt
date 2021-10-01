import numberRange from './index';

describe('Validate correct values', () => {
  test.each([
    { value: 'R$7000', minNumber: 2000, maxNumber: 9000 },
    {
      value: 'R$7.000',
      minNumber: 2000,
      maxNumber: 9000,
      thousandsSeparatorSymbol: '.',
    },
    { value: 'R$ 7000,00', minNumber: 7000, maxNumber: 8000 },
    { value: 'R$7500,50', minNumber: 7500, maxNumber: 7600 },
    { value: 2000, minNumber: 0 },
    { value: 2000, minNumber: 1950 },
    { value: 'R$12000,50', minNumber: 12000.5 },
    { value: 'R$12.000,50', minNumber: 12000.5 },
    { value: 'R$12,000', minNumber: 12000, thousandsSeparatorSymbol: ',' },
    { value: '12.000', maxNumber: 12000, thousandsSeparatorSymbol: '.' },
    { value: 1000, minNumber: 999.5, maxNumber: 1001 },
    { value: 555.5, minNumber: 555 },
    { value: 'R$ 10.000,90', minNumber: 1045, thousandsSeparatorSymbol: '.' },
    { value: 'R$1045', minNumber: 1045 },
    { value: 'R$1045,00', minNumber: 1045 },
  ])(
    'These values should pass on number range validation %s',
    ({ value, minNumber, maxNumber, thousandsSeparatorSymbol }) => {
      expect(
        numberRange.run(value, {
          minNumber,
          maxNumber,
          thousandsSeparatorSymbol,
        }).isValid,
      ).toBeTruthy();
    },
  );

  test.each([
    { value: 'R$7000', minNumber: 2000, maxNumber: 5000 },
    { value: 7000, minNumber: 2000, maxNumber: 5000 },
    { value: 2000, minNumber: 3000 },
    { value: 'R$3000,55', minNumber: 3100, maxNumber: 3155 },
    { value: 8000, minNumber: 3000, maxNumber: 7000 },
    { value: 'R$ 7000,00', minNumber: 7001, maxNumber: 7002 },
    { value: 'R$12000,50', minNumber: 12000.6 },
    { value: 'R$145,00', minNumber: 1045 },
    { value: 145, minNumber: 1045 },
    { value: 'R$14.500', minNumber: 15000, thousandsSeparatorSymbol: '.' },
  ])(
    'These values should pass on number range validation %s',
    ({ value, minNumber, maxNumber, thousandsSeparatorSymbol }) => {
      expect(
        numberRange.run(value, {
          minNumber,
          maxNumber,
          thousandsSeparatorSymbol,
        }).isValid,
      ).toBeFalsy();
    },
  );
});
