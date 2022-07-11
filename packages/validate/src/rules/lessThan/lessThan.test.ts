import lessThan from "./index"

describe("Rule - lessThan", () => {
  test.each([
    { value: 1, maxValue: 5 },
    { value: '20', maxValue: 50 },
  ])("Success Case: '$value' < $maxValue", ({ value, maxValue }) => {
    const {isValid, givenValue} = lessThan(value, { properties: { maxValue }})
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test.each([
    { value: 15, maxValue: 6 },
    { value: '20', maxValue: 15 },
  ])("Fail Case: '$value' > $maxValue", ({ value, maxValue }) => {
    const {isValid, message, givenValue} = lessThan(value, { properties: { maxValue }})
    expect(isValid).toBeFalsy()
    expect(message).toBe(`Value '${value}' is bigger than the maximun value required: ${maxValue}`)
    expect(givenValue).toBe(value)
  })
})
