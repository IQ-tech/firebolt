import isNonRepeatedChars from "./index"

describe("Correctly validates simple values", () => {
  test.each([
    "11121",
    "374382",
    "asdjhfj",
    512423,
    "a",
    "bBbBbBbB",
    2,
    "aaaBatata",
    true,
    false,
  ])("The value %p should pass on non repeated char validator", (value) => {
    expect(isNonRepeatedChars.run(value).isValid).toBeTruthy()
  })

  test.each(["1111", "2222", 11, 2222, "aaaa", "bbbbbbbb", "ssss"])(
    "Value %p shouldn`t pass on non repeated char validator",
    (value) => {
      expect(isNonRepeatedChars.run(value).isValid).toBeFalsy()
    }
  )
})

describe("Correclty validates repeated substrings", () => {
  test.each([
    { value: "Batataaa", subStr: 5 },
    { value: "12344      12", subStr: 3, ignoreSpace: true },
    { value: 555123, subStr: 4 },
    { value: "", subStr: 4 },
    { value: "      paranaue      saes     ", subStr: 3, ignoreSpace: true },
  ])(
    "Validates correctly valid values: %p",
    ({ value, subStr, ignoreSpace }) => {
      expect(
        isNonRepeatedChars.run(value, { subStr, ignoreSpace }).isValid
      ).toBeTruthy()
    }
  )

  test.each([
    { value: "Batataaa", subStr: 3 },
    { value: "Batata       com   melancia", subStr: 3, ignoreSpace: false},
    { value: "12344", subStr: 2 },
    { value: 111877, subStr: 3 },
    { value: "11111", subStr: 3 },
    { value: "11111", subStr: 5 },
    { value: "11        111", subStr: 3, ignoreSpace: false },
  ])(
    "Validates correctly invalid values: %p",
    ({ value, subStr, ignoreSpace }) => {
      expect(
        isNonRepeatedChars.run(value, { subStr, ignoreSpace }).isValid
      ).toBeFalsy()
    }
  )
})
