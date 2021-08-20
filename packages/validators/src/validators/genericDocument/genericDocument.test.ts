import isGenericDocument from './index';

describe('Generic document validation works correctly', () => {
  test.each([
    '710.288.990-92',
    '31.633.070/0001-00',
    '76849440996',
    '399.064.760-10',
  ])('document %s should pass on generic document validation', (value) => {
    expect(isGenericDocument.run(value).isValid).toBeTruthy();
  });

  test.each(['A', 'asda3', 'cebola'])(
    'item %s shouldnt pass on generic document validation',
    (value) => {
      expect(isGenericDocument.run(value).isValid).toBeFalsy();
    },
  );
});
