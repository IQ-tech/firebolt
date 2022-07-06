import repeatedChars from "./index"

describe.each([
  { value: "Lorem ipsum", char: "l", times: 3 },
  { value: "Lorem", char: "r" },
  { value: "IIpsum", times: 2 },
  { value: "IIiipsum", times: 2 },
  { value: "LLllorem iIipsum", times: 2 },
])("", ({ value, char, times }) => {
  test(`amount received ${value} letter to be validated: ${
    char ? char : "did not pass any letter to validate"
  }, maximum number of times the letter can repeat: ${
    times ? times : "did not pass any number of letters to be verified"
  } `, () => {
    
    expect(
      repeatedChars(value, { properties: { char, times } }).isValid
    ).toBeTruthy()
  })
})

describe("testing error messages", () => {
  test("test the repeated specific letters", () => {
    expect(
      repeatedChars("lllorem isum", { properties: { char: "l", times: 2 } }).message
    ).toBe("the letter l cannot be repeated more than 2 times")
  })

  test("test the repeated letters", () => {
    expect(
      repeatedChars("Lorem iiiisum", { properties: { times: 3 } }).message
    ).toBe("cannot contain repeated letters in a row, acceptable to follow no more than 3 times of letters in a row")
  })

  test("case sensitive test", () => {
    expect(
      repeatedChars("Lllorem isum", { properties: { char: "L", times: 2, caseSensitive: false} }).message
    ).toBe("the letter L cannot be repeated more than 2 times")
  })
})
