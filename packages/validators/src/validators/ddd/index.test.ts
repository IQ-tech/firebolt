import isDDDValid from './index';

describe('DDD validation', () => {
  test.each(['1', '0', '-1', '2'])(
    'the value %p should not pass in DDD validator',
    (value) => {
      expect(isDDDValid.run(value).isValid).toBeFalsy();
    },
  );

  test.each([['', '92', '11', '11981074064']])(
    'these values should pass in DDD validator',
    (value) => {
      expect(isDDDValid.run(value).isValid).toBeTruthy();
    },
  );
});
