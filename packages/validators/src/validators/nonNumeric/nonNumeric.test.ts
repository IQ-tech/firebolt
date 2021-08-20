import isNonNumeric from './index';

describe('NonNumeric validation', () => {
  test.each([123, 1, 0, '1', '0', 'cebola2'])(
    '%p should not pass in NonNumeric validator',
    (value) => {
      expect(isNonNumeric.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['', 'true', 'false', 'a'])(
    'these values should pass in NonNumeric validator',
    (value) => {
      expect(isNonNumeric.run(value).isValid).toBeTruthy();
    },
  );
});
