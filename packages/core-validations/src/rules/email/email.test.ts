import email from "./index"
import faker from "faker"

const checkingValidEmail = ({
  min,
  max,
  locale,
}: {
  min: number
  max: number
  locale: string
}) => {
  faker.locale = locale
  let i = min

  for (i; i < max; i++) {
    const value = faker.internet.email()
    expect(email(value).isValid).toBeTruthy()
  }
}

describe("email validation with faker", () => {
  test("should all emails that faker generates with default `pt-br` will be validated", () => {
    checkingValidEmail({ min: 0, max: 10000, locale: "pt_BR" })
  })

  test("should all emails that faker generates with default `en` will be validated", () => {
    checkingValidEmail({ min: 0, max: 10000, locale: "en" })
  })
})

describe("should correctly validate", () => {
  test.each([
    { value: "example@gmail.com" },
    { value: "example-example@gmail.com" },
    { value: "example@hotmail.com" },
  ])("valid email test: $value", ({ value }) => {
    expect(email(value).isValid).toBeTruthy()
  })

  test.each([
    { value: "email@-example.com" },
    { value: "email@example-.com" },
    { value: "email@-example-.com" },
  ])(
    "validate email that has a domain that ends or begins with a hyphen $value",
    ({ value }) => {
      expect(email(value).isValid).toBeFalsy()
      expect(email(value).message).toBe(
        "domain must not start or end with a hyphen -"
      )
    }
  )

  test.each([
    { value: "#@%^%#$@#$@#.com" },
    { value: "e#mail@111.222.333.44444" },
    { value: "e*mail@example..com" },
    { value: "A&bc..123@example.com" },
    { value: "email@example.com (Joe Smith)" },
    { value: "Joe Smith <email@example.com>" },
  ])("validating emails with special characters $value", ({ value }) => {
    expect(email(value).isValid).toBeFalsy()
    expect(email(value).message).toBe("special characters are not allowed")
  })

  test.each([
    { value: "email..email@example.com" },
    { value: "@example.com" },
    { value: "email.example.com" },
    { value: "email@example@example.com" },
    { value: ".email@example.com" },
    { value: "email.@example.com" },
  ])("invalid email test $value", ({ value }) => {
    expect(email(value).isValid).toBeFalsy()
    expect(email(value).message).toBe("invalid email")
  })
})
