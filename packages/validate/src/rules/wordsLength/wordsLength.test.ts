import wordsLength from "./index"

describe("correctly validates strings", () => {
  test.each([
    { value: "teste cenoura aaaaa", maxWordLength: 7 },
    { value: "tes cenoura aaaaa", minWordLength: 2 },
    { value: "tes cenoura aaaaa", minWordLength: 2, maxWordLength: 7 },
    { value: "tes aaa bbb", equalsWordLength: 3 },
  ])(
    "validates correct values",
    ({ value, maxWordLength, minWordLength, equalsWordLength }) => {
      expect(
        wordsLength(value, {
          properties: { maxWordLength, minWordLength, equalsWordLength },
        }).isValid
      ).toBeTruthy()
    }
  )

  test.each([
    {
      value: "teste cenoura aaaaa",
      maxWordLength: 6,
      expectedMessage:
        "The value 'teste cenoura aaaaa' includes words with more than 6 characters",
    },
    {
      value: "tes cenoura aaaaa",
      minWordLength: 4,
      expectedMessage:
        "The value 'tes cenoura aaaaa' includes words with less than 4 characters",
    },
    {
      value: "tes cenoura aaaaa",
      minWordLength: 4,
      maxWordLength: 6,
      expectedMessage:
        "The value 'tes cenoura aaaaa' includes words with less than 4 characters",
    },
    {
      value: "tes aaaa bbb",
      equalsWordLength: 3,
      expectedMessage:
        "the value 'tes aaaa bbb' words must have 3 characters length",
    },
  ])(
    "validates invalid values",
    ({
      value,
      maxWordLength,
      minWordLength,
      equalsWordLength,
      expectedMessage,
    }) => {
      const validation = wordsLength(value, {
        properties: { maxWordLength, minWordLength, equalsWordLength },
      })
      expect(validation.isValid).toBeFalsy()
      expect(validation.message).toBe(expectedMessage)
    }
  )
})
