import faker from 'faker';
import isValidEmail from './index';

const checkingValidEmail = ({
  min,
  max,
  locale,
}: {
  min: number;
  max: number;
  locale: string;
}) => {
  faker.locale = locale;
  let i = min;

  for (i; i < max; i++) {
    const email = faker.internet.email();
    expect(isValidEmail.run(email).isValid).toBeTruthy();
  }
};

describe('email validation', () => {
  test('should all emails that faker generates with default `pt-br` will be validated', () => {
    checkingValidEmail({ min: 0, max: 10000, locale: 'pt_BR' });
  });

  test('should all emails that faker generates with default `en` will be validated', () => {
    checkingValidEmail({ min: 0, max: 10000, locale: 'en' });
  });

  test.each([
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    'P*****4@GMAIL.COM'
  ])('should the function to indicate that the email is invalid', (value) => {
    expect(isValidEmail.run(value).isValid).toBeFalsy();
  });
});
