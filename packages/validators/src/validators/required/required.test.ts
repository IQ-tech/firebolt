import isRequired from './index';

describe('required validation', () => {
  test.each(['', {}, [], null, undefined])(
    'Given item %p should not pass in filled validator',
    (value) => {
      expect(isRequired.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['Victor', { name: 'Fellype' }, true, false, 20, 0, 'cebola batata'])(
    'Given item %p should pass in filled validator',
    (value) => {
      expect(isRequired.run(value).isValid).toBeTruthy();
    },
  );
});
