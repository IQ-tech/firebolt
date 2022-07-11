import regexMatch from "./index"

describe("Validating a regexMatch rule", () => {
  test.each([
    {
      value: "does not contain the letter of the rule",
      pattern: "b",
      shouldMatch: false,
    },
    {
      value: "this rule set if it has more than two repeated letters",
      pattern: "(.)\\1{2,}",
      shouldMatch: false,
    },
    {
      value: "symbol-rule-in-emails",
      pattern: "[~!\"/#$%^&*()+=`{}[\\]|\\\\:;'<>,?]",
      shouldMatch: false,
    },
    {
      value: "emailsInvalid@gmail.com.com",
      pattern:
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      shouldMatch: true,
    },
    { value: 34, pattern: /^(34|37|4|5[1-5]).*$/, shouldMatch: true },
  ])(
    "field successfully validated based on rule '$pattern' and value '$value'",
    ({ value, pattern, shouldMatch }) => {
      const { isValid, givenValue } = regexMatch(value, {
        properties: { pattern, shouldMatch },
      })
      expect(isValid).toBeTruthy()
      expect(givenValue).toBe(value)
    }
  )
})

// { value: 190, pattern: "[~!"/#$%^&*()+=`{}[\]|\\:;'<>,?]" },

// { value: "emailTest@gmail.com", pattern: "regex" },
