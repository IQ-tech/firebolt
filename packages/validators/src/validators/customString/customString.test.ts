import customStringValidation from './index';

describe.each([
  { value: 'cabola batata', minWords: 2, expectValue: true },
  { value: 'cabola batata', maxWords: 1, expectValue: false },
  { value: 'cabola', minWords: 2, expectValue: false },
  {
    value: 'cabola batata lala cece',
    minWords: 2,
    maxWords: 3,
    expectValue: false,
  },
  {
    value: 'cabola batata',
    minWords: 1,
    maxCharsPerWord: 2,
    expectValue: false,
  },
  {
    value: 'cabola batata',
    minWords: 1,
    minCharsPerWord: 2,
    expectValue: true,
  },
])(
  'This strings shoud validate correctly',
  ({ value, expectValue, ...configs }) => {
    test(`"${value}" ${
      !!expectValue ? 'should' : 'should not'
    } pass on custom string validation (${JSON.stringify(configs)})`, () => {
      expect(customStringValidation.run(value, { ...configs }).isValid).toBe(
        expectValue,
      );
    });
  },
);
