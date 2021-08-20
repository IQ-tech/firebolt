import isNumeric from './index';

describe('numeric validation', () => {
  test.each(['geroge10', 'senha123'])(
    '%p should not pass in numeric validator',
    (value) => {
      expect(isNumeric.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['100', '1000', '2050'])(
    'these number should pass in numeric validator',
    (value) => {
      expect(isNumeric.run(value).isValid).toBeTruthy();
    },
  );
});
