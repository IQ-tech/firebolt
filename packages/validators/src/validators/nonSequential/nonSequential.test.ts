import isNonSequential from './index';

describe('Correctly validates simple values', () => {
  test.each([
    '11111',
    '374382',
    'asdjhfj',
    512423,
    'a',
    2,
    true,
    false,
    1245,
    '1245',
    'abdef',
  ])('The value %p should pass on non sequential value validator', (value) => {
    expect(isNonSequential.run(value).isValid).toBeTruthy();
  });

  test.each(['12345', '12', 23, 5678, '123', 'abcdefg', 'abc'])(
    'Value %p shouldn`t pass on non sequential validator',
    (value) => {
      expect(isNonSequential.run(value).isValid).toBeFalsy();
    },
  );
});
