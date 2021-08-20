import specialCharacters from './index';

describe('specialCharacters validation', () => {
  test.each(['geroge$', 'jorge`s'])(
    '%p should not pass in specialCharacters validator',
    (value) => {
      expect(specialCharacters.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['Testing3', '21321323', 'Victor'])(
    'these phone should pass in phone validator',
    (value) => {
      expect(specialCharacters.run(value).isValid).toBeTruthy();
    },
  );
});
