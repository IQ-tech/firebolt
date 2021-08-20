import isNonRepeatedChars from './index';

describe('Correctly validates simple values', () => {
  test.each([
    '11121',
    '374382',
    'asdjhfj',
    512423,
    'a',
    'bBbBbBbB',
    2,
    'aaaBatata',
    true,
    false,
  ])('The value %p should pass on non repeated char validator', (value) => {
    expect(isNonRepeatedChars.run(value).isValid).toBeTruthy();
  });

  test.each(['1111', '2222', 11, 2222, 'aaaa', 'bbbbbbbb', 'ssss'])(
    'Value %p shouldn`t pass on non repeated char validator',
    (value) => {
      expect(isNonRepeatedChars.run(value).isValid).toBeFalsy();
    },
  );
});

describe('Correclty validates repeated substrings', () => {
  test.each([
    { value: 'Batataaa', subStr: 5 },
    { value: '12344', subStr: 3 },
    { value: 555123, subStr: 4 },
    { value: '', subStr: 4 },
  ])('Validates correctly valid values: %p', ({ value, subStr }) => {
    expect(isNonRepeatedChars.run(value, { subStr }).isValid).toBeTruthy();
  });

  test.each([
    { value: 'Batataaa', subStr: 3 },
    { value: '12344', subStr: 2 },
    { value: 111877, subStr: 3 },
    { value: '11111', subStr: 3 },
    { value: '11111', subStr: 5 },
  ])('Validates correctly invalid values: %p', ({ value, subStr }) => {
    expect(isNonRepeatedChars.run(value, { subStr }).isValid).toBeFalsy();
  });
});
