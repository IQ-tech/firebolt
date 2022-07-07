import email from "./index"



describe.each([
  { value: "paraanue@gmail.com" },
  { value: "assda-asd@gmail.com" },
])("", ({ value }) => {
  test(`${value}: valid email test`, () => {
    console.log(email(value))
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
