import inclusion from "./index"

describe("Rule - Inclusion", () => {
  const stringArray = ["Tomate", 'Batata', 'Cenoura']
  test.each([
    { value: "Batata", included: stringArray },
    { value: "bata", included: "batata" },
  ])("Success Case (includes): '$value' in '$included'", ({ value, included }) => {
    const {isValid, givenValue} = inclusion(value, { properties: { included }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: "tomate", included: stringArray },
    { value: "Beringela", included: stringArray },
    { value: "teste@email.com", included: "tomate" },
  ])("Fail Case (includes): '$value' not in '$included'", ({ value, included }) => {
    const {isValid, message, givenValue} = inclusion(value, { properties: { included }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`The value '${value}' is not included in ${included}`)
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: "batata", contains: "bata" },
    { value: "teste@email.com", contains: "@email.com" },
  ])("Success Case (contains): '$contains' in '$value'", ({ value, contains }) => {
    const {isValid, givenValue} = inclusion(value, { properties: { contains }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: "tomate", contains: "batata" },
    { value: "teste@email.com", contains: "@email.com.br" },
  ])("Fail Case (includes): '$contains' not in $value'", ({ value, contains }) => {
    const {isValid, message, givenValue} = inclusion(value, { properties: { contains }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`The value '${value}' not contain ${contains}`)
    expect(givenValue).toBe(value)
  })
})
