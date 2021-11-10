import validate from './index';

describe.each([
  { validator: 'day', valueToValidate: 20 },
  { validator: 'date', valueToValidate: '29/02/2000' },
  { validator: 'cpf', valueToValidate: '161.944.690-13' },
  { validator: 'noSpecialCaracteres', valueToValidate: 'top show bala' },
  {
    validator: 'minAge',
    valueToValidate: '10/02/2001',
    properties: { minAge: 18 },
  },
  {
    validator: 'customStringValidation',
    valueToValidate: 'Tom cebola fernandes',
    properties: { minWords: 3, maxWords: 5 },
  },
  {
    validator: 'bankAccountNumber',
    valueToValidate: '47291-0',
    properties: { bankBranch: '0562', bankSlug: 'itau', accountType: null },
  },
])(
  'Correclty validates the fields',
  ({ validator, valueToValidate, properties }) => {
    test(`Value ${valueToValidate} should pass on validator ${validator} using the validate function. (params: ${JSON.stringify(
      properties,
    )})`, () => {
      expect(
        validate(validator, valueToValidate, properties).isValid,
      ).toBeTruthy();
    });
  },
);

describe.each([
  { validator: 'day', valueToValidate: 45 },
  { validator: 'date', valueToValidate: '29/01/3001' },
  { validator: 'cpf', valueToValidate: '618.906.140-03' },
  { validator: 'noSpecialCaracteres', valueToValidate: 'top $how b@la' },
  {
    validator: 'minAge',
    valueToValidate: '10/02/2001',
    properties: { minAge: 30 },
  },
  {
    validator: 'customStringValidation',
    valueToValidate: 'Tom cebola fernandes',
    properties: { minWords: 4, maxWords: 5 },
  },
  {
    validator: 'bankAccountNumber',
    valueToValidate: '70384570-5',
    properties: { bankBranch: '2872', accountType: '006', bankSlug: 'caixa' },
  },
])(
  'Correclty validates the invalid fields',
  ({ validator, valueToValidate, properties }) => {
    test(`Value ${valueToValidate} should not pass on validator ${validator} using the validate function. (params: ${JSON.stringify(
      properties,
    )})`, () => {
      expect(
        validate(validator, valueToValidate, properties).isValid,
      ).toBeFalsy();
    });
  },
);
