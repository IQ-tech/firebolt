import email from "../../rules/email"
import stringLength from "../../rules/stringLength"
import wordsCount from "../../rules/wordsCount"
import composeRules from "./index"

describe("correctly validates composed rules", () => {
  const myComposedRule = composeRules(
    email,
    stringLength.freeze({ maxLength: 20 }),
    wordsCount.freeze({ maxWords: 1 })
  )
  test("hit the correct value", () => {
    const value = "potato@carrot.com"
    const { isValid, givenValue } = myComposedRule(value)
    expect(isValid).toBeTruthy()
    expect(givenValue).toBe(value)
  })

  test("hit the invalid value", () => {
    const value = "myreallylongemail@carrot.com"
    const { isValid, givenValue, message } = myComposedRule(value)
    expect(isValid).toBeFalsy()
    expect(givenValue).toBe(value)
    expect(message).toBe(
      "Value 'myreallylongemail@carrot.com' is greater than the max length: 20 chars"
    )
  })
})
