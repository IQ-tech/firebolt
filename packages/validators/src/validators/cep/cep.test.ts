import isCepValid from './index';

describe('CEP validation', () => {
  test.each(['0436A000', '8999!999', '1234567', '123456789'])(
    'the value %p should not pass in  CEP validator',
    (value) => {
      expect(isCepValid.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['04360000', '89991999', '12345678', '13224-450', ''])(
    'the value %p should pass in CEP validator',
    (value) => {
      expect(isCepValid.run(value).isValid).toBeTruthy();
    },
  );
});
