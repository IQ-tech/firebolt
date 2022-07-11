import stringLength from "./index"

describe.each([
  { value: "cebola", maxLength: 7, minLength: 2 },
  { value: "a", maxLength: 1 },
  { value: "a", minLength: 1 },
  { value: "a", maxLength: 10, minLength: 1 },
  { value: "aa", maxLength: 10, minLength: 1 },
  { value: "Random johnson", maxLength: 20, minLength: 5 },
  { value: "test", equals: 4 },
])(
  "This strings should pass on char number validation",
  ({ value, maxLength, minLength, equals }) => {
    test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {
      expect(
        stringLength(value, { properties: { maxLength, minLength, equals } })
          .isValid
      ).toBeTruthy()
    })
  }
)

describe.each([
  { value: "addddd", minLength: 10 },
  { value: "cebola", maxLength: 2, minLength: 1 },
  { value: "test", equals: 5 },
])(
  "This strings should not pass on char number validation",
  ({ value, maxLength, minLength, equals }) => {
    test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {
      expect(
        stringLength(value, { properties: { maxLength, minLength, equals } })
          .isValid
      ).toBeFalsy()
    })
  }
)

describe("correctly throws error messages", () => {
  test("Value is less than the minimum length", () => {
    expect(
      stringLength("abcsd", { properties: { minLength: 6 } }).message
    ).toBe("Value 'abcsd' is less than the minimum length: 6 chars")
  })

  test("Value is greater than the max length", () => {
    expect(
      stringLength("abcsdsasdsf", { properties: { maxLength: 6 } }).message
    ).toBe("Value 'abcsdsasdsf' is greater than the max length: 6 chars")
  })

  test("The value should equals (bigger value)", () => {
    expect(
      stringLength("abscdfgh", { properties: { equals: 6 } }).message
    ).toBe("The value 'abscdfgh' should have 6 characters")
  })

  test("The value should equals (smaller value)", () => {
    expect(stringLength("abs", { properties: { equals: 6 } }).message).toBe(
      "The value 'abs' should have 6 characters"
    )
  })
})
