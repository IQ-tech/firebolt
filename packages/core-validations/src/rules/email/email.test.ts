import email from "./index"
import faker from 'faker';

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
    const value = faker.internet.email();
    expect(email(value).isValid).toBeTruthy();
  }
};

describe("email validation", () => {
  test('should all emails that faker generates with default `pt-br` will be validated', () => {
    checkingValidEmail({ min: 0, max: 10000, locale: 'pt_BR' });
  });

  test('should all emails that faker generates with default `en` will be validated', () => {
    checkingValidEmail({ min: 0, max: 10000, locale: 'en' });
  });
})

describe.each([
  { value: "paraanue@gmail.com" },
  { value: "assda-asd@gmail.com" },
])("", ({ value }) => {
  test(`${value}: valid email test`, () => {
    expect(email(value).isValid).toBeTruthy()
  })
})


describe.each([
  { value: "#@%^%#$@#$@#.com" },
  { value: "@example.com" },
  { value: "Joe Smith <email@example.com>" },
  { value: "email.example.com" },
  { value: "email@example@example.com" },
  { value: ".email@example.com" },
  { value: "email.@example.com" },
  { value: "email..email@example.com" },
  { value: "email@example.com (Joe Smith)" },
  { value: "email@example" },
  { value: "email@-example.com" },
  { value: "email@111.222.333.44444" },
  { value: "email@example..com" },
  { value: "Abc..123@example.com" }
])("", ({ value }) => {
  test(`${value}: invalid email test`, () => {
    expect(email(value).isValid).toBeFalsy()
    expect(email(value).message).toBe("invalid email")
  })
})
