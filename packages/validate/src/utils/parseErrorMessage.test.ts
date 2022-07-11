import parseErrorMessage from "./parseErrorMessage"

describe("correctly replaces values", () => {
  test.each([
    {
      message: "The value #{value} should exists",
      value: 3,
      expected: "The value 3 should exists",
    },
    {
      message: "#{value} value should exists",
      value: 6,
      expected: "6 value should exists",
    },
    {
      message: "The value should exists #{value}",
      value: 10,
      expected: "The value should exists 10",
    },
  ])("correctly applies values (message: $message , value: $value)", ({ message, value, expected }) => {
    expect(parseErrorMessage(message, value)).toBe(expected)
  })

  test.each([
    {
      message: "The value #{cebola} should exists",
      properties: { "cebola": "ll" },
      expected: "The value ll should exists",
    },
    {
      message: "#{batata} The value should exists",
      properties: { "batata": "lulu" },
      expected: "lulu The value should exists",
    },
    {
      message: "The value should exists #{xuxu}",
      properties: { "xuxu": "lele" },
      expected: "The value should exists lele",
    },
  ])("correctly applies properties", ({ message, properties, expected }) => {
    expect(parseErrorMessage(message, "", properties)).toBe(expected)
  })

  test.each([
    {
      message: "The value #{cebola} should exists #{value}",
      properties: { "cebola": "ll" },
      value: 3,
      expected: "The value ll should exists 3",
    },
    {
      message: "#{batata} The value should #{value} exists",
      properties: { "batata": "lulu" },
      value: 6,
      expected: "lulu The value should 6 exists",
    },
    {
      message: "#{value} The value should exists #{xuxu}",
      properties: { "xuxu": "lele" },
      value: "hehe",
      expected: "hehe The value should exists lele",
    },
  ])(
    "correctly applies values and properties",
    ({ message, properties, value, expected }) => {
      expect(parseErrorMessage(message, value, properties)).toBe(expected)
    }
  )
  test.each([
    {
      message: "The value #{batata} should exists",
      properties: { "cebola": "ll" },
      expected: "The value undefined should exists",
    },
    {
      message: "#{cebola} The value should exists",
      properties: { "batata": "lulu" },
      expected: "undefined The value should exists",
    },
    {
      message: "The value should exists #{xuxus}",
      properties: { "xuxu": "lele" },
      expected: "The value should exists undefined",
    },
  ])(
    "keeps properties as undefined if does not exists",
    ({ message, properties, expected }) => {
      expect(parseErrorMessage(message, properties)).toBe(expected)
    }
  )
})
