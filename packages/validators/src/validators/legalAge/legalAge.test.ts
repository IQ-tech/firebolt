import isOfLegalAge from './index';

describe('legal age validation', () => {
  const mockedCloseLimitYear = new Date().getFullYear() - 17
  const mockedCloseLimitDate = `19/06/${mockedCloseLimitYear}`
  test.each(['12/02/2007', '24/07/2009', mockedCloseLimitDate])(
    'This date %p should not pass in legal age validator',
    (value) => {
      expect(isOfLegalAge.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['12/02/1972', '09/07/1973', '16/06/2003', '19/06/2003'])(
    'This date %p should pass in legal age validator',
    (value) => {
      expect(isOfLegalAge.run(value).isValid).toBeTruthy();
    },
  );
});
