import faker from "faker"
import isValidEmail from "./index"

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
    const email = faker.internet.email()
    expect(isValidEmail.run(email).isValid).toBeTruthy()
  }
}

describe("email validation", () => {
  test("should all emails that faker generates with default `pt-br` will be validated", () => {
    checkingValidEmail({ min: 0, max: 10000, locale: "pt_BR" })
  })

  test("should all emails that faker generates with default `en` will be validated", () => {
    checkingValidEmail({ min: 0, max: 10000, locale: "en" })
  })
})

describe.each([
  "#@%^%#$@#$@#.com",
  "@example.com",
  "Joe Smith <email@example.com>",
  "email.example.com",
  "email@example@example.com",
  ".email@example.com",
  "email.@example.com",
  "email..email@example.com",
  "email@example.com (Joe Smith)",
  "email@example",
  "email@-example.com",
  "email@111.222.333.44444",
  "email@example..com",
  "Abc..123@example.com",
  "P*****4@GMAIL.COM",
  "émail@example.com",
  "emaiû@example.com",
  "emãil@example.com",
  "emaìl@example.com",
  "emõil@example.com",
  "emçil@g.com",
])("characters email validation", (value) => {
  test(`Email (${value}) must be invalid`, () => {
    expect(isValidEmail.run(value).isValid).toBeFalsy()
  })
})

describe.each([
  "lampião@gmai.com",
  "ojuara@gmil.com",
  "descer-para-baixo@gamil.com",
  "subir-para-cima@gmal.com",
  "38@gmail.com.br",
  "macaxeira@gmai.com",
  "barruada@gmil.com",
  "nada@gamil.com",
  "xurupita@gmal.com",
  "voadora@gemail.com",
  "letras@gmail.co",
  "chita@gamail.com",
  "coala@gmail.con",
  "porco@gmail.co.com",
  "aranha@gmsil.com",
  "acabou@ymail.com",
  "ainda@email.com",
  "nao@gm.com",
  "caracolis@gmail.cm",
  "agora@g.com",
])("valid email domain", (value) => {
  test(`Email (${value}) must be invalid, you didn't mean gmail.com?`, () => {
    const domainEmail = `@${value.split("@")[1]}`
    const messageError = `Você quis dizer ${value.replace(domainEmail, "<em>@gmail.com</em>?")}`

    expect(isValidEmail.run(value).isValid).toBeFalsy()
    expect(isValidEmail.run(value).message).toBe(messageError)

  })
})
