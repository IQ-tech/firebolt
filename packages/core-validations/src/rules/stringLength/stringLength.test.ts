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
  { value: 'addddd', maxLength: 10, minLength: 5 },
  { value: 'cebola', maxLength: 2, minLength: 1 },
  { value: 'test', equals: 5 },
])(
  'This strings should not pass on char number validation',
  ({ value, maxLength, minLength, equals }) => {
    test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {
      expect(
        stringLength(value, { properties: { maxLength, minLength, equals } })
        .isValid
      ).toBeFalsy();
    });
  },
);



describe.each([
  { value: 'assss', maxLength: 1 },
  { value: 'cebola', maxLength: 2, minLength: 1 },
  { value: 'test', equals: 5 },
])(
  'This strings should not pass on char number validation',
  ({ value, maxLength, minLength, equals }) => {
    test(`value ${value} with max length: ${maxLength} and min length: ${minLength}`, () => {

      // expect(
      //   stringLength(value, { properties: { maxLength, minLength, equals } })
      //   .isValid
      // ).toBeFalsy();
   
    });


  },
);