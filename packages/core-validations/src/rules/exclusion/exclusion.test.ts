import exclusion from "./index"

describe("Rule - Exclusion", () => {
  const stringArray = ["Tomate", 'Batata', 'Cenoura']
  test.each([
    { value: "Batata", included: stringArray },
    { value: "bata", included: "batata" },
  ])("Success Case (includes): '$value' in '$included'", ({ value, included }) => {
    const {isValid, givenValue, message} = exclusion(value, { properties: { included }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`The value '${value}' is included in ${included}`)
    expect(givenValue).toBe(value)

  })

  test.each([
    { value: "tomate", included: stringArray },
    { value: "Beringela", included: stringArray },
    { value: "teste@email.com", included: "tomate" },
  ])("Fail Case (includes): '$value' not in '$included'", ({ value, included }) => {
    const {isValid, givenValue} = exclusion(value, { properties: { included }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: "batata", contains: "bata" },
    { value: "teste@email.com", contains: "@email.com" },
  ])("Success Case (contains): '$contains' in '$value'", ({ value, contains }) => {
    const {isValid, message, givenValue} = exclusion(value, { properties: { contains }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`The value '${value}' contains ${contains}`)
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: "tomate", contains: "batata" },
    { value: "teste@email.com", contains: "@email.com.br" },
  ])("Fail Case (includes): '$contains' not in $value'", ({ value, contains }) => {
    const {isValid, givenValue} = exclusion(value, { properties: { contains }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })
})
