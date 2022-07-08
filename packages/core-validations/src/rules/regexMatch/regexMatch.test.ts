import regexMatch from './index'

describe("Validating a regexMatch rule", () => {
    test.each([
      { value: "does not contain the letter of the rule", pattern: "b" },
      { value: "*this rule set if it has more than two repeated letters", pattern: "(.)\\1{2,}"},
      { value: "symbol-rule-in-emails", pattern: '[~!"/#$%^&*()+=`{}[\\]|\\\\:;\'<>,?]' },
        { value: "symbol-rule-in-emails", pattern: '[~!"/#$%^&*()+=`{}[\\]|\\\\:;\'<>,?]' },
      ])(
        "field successfully validated based on rule '$pattern' and value '$value'",
        ({ value, pattern }) => {
          const { isValid, givenValue } = regexMatch(value, {properties: { pattern }})
          expect(isValid).toBeTruthy()
          expect(givenValue).toBe(value)
        }
      )


})



// { value: 190, pattern: "'/[~!"/#$%^&*()+=`{}[\\]|\\\\:;\'<>,?]/gi'" },
// { value: "0190", pattern: "regex" },
// { value: "emailTest@gmail.com", pattern: "regex" },