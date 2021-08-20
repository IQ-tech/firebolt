import isMinAge from './index';

describe('isMinAge validation', () => {
  test('This date should not pass as min age', () => {
    expect(isMinAge.run('02/02/1996', { minAge: 40 }).isValid).toBeFalsy();
  });

  test('This date should pass as min age', () => {
    expect(isMinAge.run('02/02/1996', { minAge: 18 }).isValid).toBeTruthy();
  });

  test('This date should pass as min age', () => {
    expect(isMinAge.run('16/06/2003', { minAge: 18 }).isValid).toBeTruthy();
  });
});
