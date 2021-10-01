import isValidName from './index';

describe('name validation', () => {
  test.each(['123', 'Revircreison', 'Oba top!', 'Papai noel 1', 'R Berte'])(
    'item %p should not pass in name validator',
    (value) => {
      expect(isValidName.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['Revircreison Jr', 'Oba top', 'Papai noel'])(
    'these names should pass in name validator',
    (value) => {
      expect(isValidName.run(value).isValid).toBeTruthy();
    },
  );
});
