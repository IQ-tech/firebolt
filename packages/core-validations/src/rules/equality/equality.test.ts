import equality from "./index"

describe("equality validator test", () => {
  test.each([
    { value: "123WQs23ssPP>><", compareTo: "123WQs23ssPP>><" },
    { value: "%^&HTGH*aaS", compareTo: "%^&HTGH*aaS" },
    { value: 1234567890, compareTo: 1234567890 },
    { value: "01234567890", compareTo: "01234567890" },
    { value: "emailTest@gmail.com", compareTo: "emailTest@gmail.com" },
  ])("Successful comparison between '$value' and '$compareTo'", ({ value, compareTo }) => {
      expect(equality(value, { properties: { compareTo }})).toBeTruthy()
  })
})
