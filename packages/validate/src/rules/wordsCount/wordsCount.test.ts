import wordsCount from "./index"

describe.each([
  { value: "Lorem ipsum", maxWords: 2, minWords: 1 },
  { value: "Lorem", maxWords: 1 },
  { value: "Ipsum", minWords: 1 },
])(
  "These words must pass the word number validation",
  ({ value, maxWords, minWords }) => {
    test(`value ${value} with max words: ${!maxWords ? "no value has been set" : maxWords}, and min words: ${!minWords ? "no value has been set" : minWords}`, () => {
      expect(
        wordsCount(value, { properties: { maxWords, minWords } }).isValid
      ).toBeTruthy()
    })
  }
)

describe("to validate the conflict between the minimum and maximum amount of words", () => {
  test("minimum word value greater than maximum", () => {
    expect(
      wordsCount("Lorem ipsum", { properties: { maxWords: 1, minWords: 2 } }).message
    ).toBe(
      "Conflict in word values, the minWords of the words 2 must be less than the maxWords of the words 1"
    )
  })
})

describe("maximum number of words", () => {
  test("validating the maximum words error message", () => {
    expect(
      wordsCount("Lorem ipsum simply", { properties: { maxWords: 2 } }).message
    ).toBe("Lorem ipsum simply, exceeds the maximum number of words allowed, enter 2 words")
  })
})

describe("minimum number of words", () => {
  test("validating the minimum words error message", () => {
    expect(
      wordsCount("Lorem ipsum simply", { properties: { minWords: 4 } }).message
    ).toBe("Lorem ipsum simply, must have at least 4 words")
  })
})