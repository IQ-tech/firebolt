import isDayValid from './index';

describe('day validation', () => {
  test.each([0, 50, 31.5, 'cenoura', '40', {}, []])(
    'The value %p should not pass in the day validator',
    (value) => {
      expect(isDayValid.run(value).isValid).toBeFalsy();
    },
  );

  test.each([1, '14', 31, 5, '4', ''])(
    'The value %p should pass in the day validator',
    (value) => {
      expect(isDayValid.run(value).isValid).toBeTruthy();
    },
  );
});
