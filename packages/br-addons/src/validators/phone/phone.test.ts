import phone from "./index"

describe("isPhoneValid validation", () => {
  test.each(["geroge", "(__)1___-____", 1, "11,951234123", "+11951234123"])(
    "test %p should not pass in phone validator",
    (value) => {
      expect(phone(value).isValid).toBeFalsy()
    }
  )

  test.each([
    "(11)914254160",
    "(11)98734-4169",
    "(15)1234-4069",
    "11945953454",
  ])("%p phone should pass in phone validator", (value) => {
    expect(phone(value).isValid).toBeTruthy()
  })
})
