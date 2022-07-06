import repeatedChars from "./index"

describe.each([
  { value: "Llorem ipsum", char: "l", times: 3 },
  { value: "Lorem", char: "o" },
  { value: "Ipsum", times: 2 },
])(
  "",
  ({ value, char, times }) => {
    test(`value ${value} blabla.....: ${char}, blabla...... ${times} `, () => {
      expect(
        repeatedChars(value, { properties: { char, times } }).isValid
      ).toBeTruthy()
    })
  }
)

// describe("param conflict", () => {
//   test("bla bla bla.....", () => {
//     expect(
//       funcTest("Lorem ipsum", { properties: { maxWords: 1, minWords: 2 } }).message
//     ).toBe(
//       "message error"
//     )
//   })
// })
