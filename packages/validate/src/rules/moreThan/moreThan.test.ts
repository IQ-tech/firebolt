import moreThan from "./index"

describe("Rule - MoreThan", () => {
  test.each([
    { value: 5, minValue: 1 },
    { value: '20', minValue: 2 },
  ])("Success Case (MoreThan): '$value' > '$minValue'", ({ value, minValue }) => {
    const {isValid, givenValue} = moreThan(value, { properties: { minValue }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: 5, minValue: 6 },
    { value: '20', minValue: 50 },
  ])("Fail Case (moreThan): '$value' < '$minValue'", ({ value, minValue }) => {
    const {isValid, message, givenValue} = moreThan(value, { properties: { minValue }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`Value '${value}' is less than the minimum value required: ${minValue}`)
    expect(givenValue).toBe(value)
  })
})
