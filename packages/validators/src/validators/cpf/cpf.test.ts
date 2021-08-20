import isCpf from './index';

describe('CPF validation', () => {
  test.each([
    '1234',
    '123456789012',
    '02716077267',
    '027.160.772-67',
    '027.160-772.69',
    '123456789',
  ])('value %p should not pass in CPF validator', (value) => {
    expect(isCpf.run(value).isValid).toBeFalsy();
  });

  test.each(['687.968.650-83', '684.752.900-86', '71028899092'])(
    'The value %p should pass in CPF validator',
    (value) => {
      expect(isCpf.run(value).isValid).toBeTruthy();
    },
  );
});
