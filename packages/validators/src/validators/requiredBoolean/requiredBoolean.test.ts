import isRequired from './index';

describe('required validation', () => {
  test.each(['1', 'true', 'false', null, undefined, false])(
    'Given item %p should not pass in filled validator',
    (value) => {
      expect(isRequired.run(value).isValid).toBeFalsy();
    },
  );

  test.each([true])(
    'Given item %p should pass in filled validator',
    (value) => {
      expect(isRequired.run(value).isValid).toBeTruthy();
    },
  );
});
