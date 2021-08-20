import isDate from './index';

describe('Date validation', () => {
  test.each(['02/13/2016', '02/02/1000', '32/12/2016', '__02/2003'])(
    'the date %p should not pass in Date validator',
    (value) => {
      expect(isDate.run(value).isValid).toBeFalsy();
    },
  );

  test.each(['02/12/2016', '02/02/2000', '31/12/2016', '15/10/1961'])(
    'these date should pass in Date validator',
    (value) => {
      expect(isDate.run(value).isValid).toBeTruthy();
    },
  );
});

test.each(['02/1995', '12/2001', '4/2003', '08/1991'])(
  'The value %p should pass on partial date (month and year) validation',
  (value) => {
    expect(isDate.run(value, { partialDate: true }).isValid).toBeTruthy();
  },
);

test.each(['15/1995', '12/4001', '-1/2003', '08/2991'])(
  'The value %p should not pass on partial date (month and year) validation',
  (value) => {
    expect(isDate.run(value, { partialDate: true }).isValid).toBeFalsy();
  },
);
