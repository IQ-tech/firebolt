import equality from "./index"

describe("equality validator test", () => {
  test.each([
    { value: "123WQs23ssPP>><", compareTo: "123WQs23ssPP>><" },
    { value: "%^&HTGH*aaS", compareTo: "%^&HTGH*aaS" },
    { value: 1234567890, compareTo: 1234567890 },
    { value: "01234567890", compareTo: "01234567890" },
    { value: "emailTest@gmail.com", compareTo: "emailTest@gmail.com" },
  ])("Successful comparison between '$value' and '$compareTo'", ({ value, compareTo }) => {
      expect(equality(value, { properties: { compareTo }}).isValid).toBeTruthy()
      expect(equality(value, { properties: { compareTo }}).givenValue).toBe(value)
  })

  test.each([
    { value: "de>><", compareTo: "De>><" },
    { value: "%^&H*", compareTo: "%^&" },
    { value: 1234, compareTo: 120 },
    { value: "019-0", compareTo: "0-0" },
    { value: "emailTest@gmail.com", compareTo: "emailTest@hotmail.com" },
  ])("Unsuccessful in comparing '$value' and '$compareTo'", ({ value, compareTo }) => {
      expect(equality(value, { properties: { compareTo }}).isValid).toBeFalsy()
      expect(equality(value, { properties: { compareTo }}).message).toBe("Values ​​must be the same for confirmation")
      expect(equality(value, { properties: { compareTo }}).givenValue).toBe(value)
  })
})
