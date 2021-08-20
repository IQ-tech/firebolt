import isCnpj from './index';

describe('CNPJ validation', () => {
  test.each([['34.251.125/0001-06', '34251125000106', '94.886.001/0001-29']])(
    'the value %p should pass in CNPJ validator',
    (value) => {
      expect(isCnpj.run(value).isValid).toBeTruthy();
    },
  );

  test.each([
    ['77237335000159', '25925279020181', '15313444010254', '123456789'],
  ])('the value %p should not pass in CNPJ validator', (value) => {
    expect(isCnpj.run(value).isValid).toBeFalsy();
  });
});
