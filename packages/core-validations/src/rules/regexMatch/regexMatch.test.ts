import regexMatch from './index'

describe("Validating a regexMatch rule", () => {
    test.each([
        { value: "does notaaa contain the letter of the rule", pattern: "/a/" },

      ])(
        "field successfully validated based on rule '$pattern' and value '$value'",
        ({ value, pattern }) => {
          const { isValid, givenValue } = regexMatch(value, {properties: { pattern }})
          expect(isValid).toBeTruthy()
          expect(givenValue).toBe(value)
        }
      )


})


// { value: "*aaS", pattern: "regex" },
// { value: 190, pattern: "regex" },
// { value: "0190", pattern: "regex" },
// { value: "emailTest@gmail.com", pattern: "regex" },