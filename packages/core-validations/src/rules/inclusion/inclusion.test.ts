import inclusion from "./index"

describe("Rule - Inclusion", () => {
  const stringArray = ["Tomate", 'Batata', 'Cenoura']
  test.each([
    { value: "Tomate", included: stringArray },
    { value: "teste@email.com", included: "@email.com" },
  ])("Success includes: '$value' in '$included'", ({ value, included }) => {
    const validate = inclusion(value, { properties: { included }})
    expect(validate.isValid).toBeTruthy()
    expect(validate.givenValue).toBe(value)
  })

  test.each([
    { value: "tomate", included: stringArray },
    { value: "Beringela", included: stringArray },
    { value: "teste@email.com", included: "@email.com.br" },
  ])("Fail includes: '$value' not in '$included'", ({ value, included }) => {

    const validate = inclusion(value, { properties: { included }})
    expect(validate.isValid).toBeFalsy()
    expect(validate.message).toBe("Values ​​must be the same for confirmation")
    expect(validate.givenValue).toBe(value)
  })

  test.each([
    { value: "tomate", contains: "mate" },
    { value: "teste@email.com", contains: "@email.com" },
  ])("Success contains: '$contains' in '$value'", ({ value, contains }) => {
    const validate = inclusion(value, { properties: { contains }})
    expect(validate.isValid).toBeTruthy()
    expect(validate.givenValue).toBe(value)
  })
})
