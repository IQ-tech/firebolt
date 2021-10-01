import isSameValue from './index';

describe('Correctly validates the values', () => {
  test.each([
    { value: '', valueToCompare: '' },
    { value: 'test', valueToCompare: 'test' },
    { value: 1234, valueToCompare: 1234 },
    { value: '1234', valueToCompare: '1234' },
    { value: 'test2', valueToCompare: `test${2}` },
  ])(`should pass on isSamevalue validator %p`, ({ value, valueToCompare }) => {
    expect(isSameValue.run(value, { valueToCompare }).isValid).toBeTruthy();
  });

  test.each([
    { value: 'test', valueToCompare: 'Test' },
    { value: 1234, valueToCompare: 1236 },
    { value: '1234', valueToCompare: '1236' },
    { value: '1234', valueToCompare: 1234 },
  ])(`should not pass on isSamevalue validator %p`, ({ value, valueToCompare }) => {
    expect(isSameValue.run(value, { valueToCompare }).isValid).toBeFalsy();
  });

  test.each([{ value: '1234', valueToCompare: 1234, typeStrict: false }])(
    `should pass on isSamevalue validator %p`,
    ({ value, valueToCompare, typeStrict }) => {
      expect(
        isSameValue.run(value, { valueToCompare, typeStrict }).isValid,
      ).toBeTruthy();
    },
  );
});
