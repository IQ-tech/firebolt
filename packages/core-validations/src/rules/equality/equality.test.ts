import equality from "./index"

describe("equality validator test", () => {
  test.each([
    { value: "123WQs23ssPP>><", valueToConfirm: "123WQs23ssPP>><" },
    { value: "%^&HTGH*aaS", valueToConfirm: "%^&HTGH*aaS" },
    { value: 1234567890, valueToConfirm: 1234567890 },
    { value: "01234567890", valueToConfirm: "01234567890" },
    { value: "emailTest@gmail.com", valueToConfirm: "emailTest@gmail.com" },
  ])("Successful comparison between '$value' and '$valueToConfirm'", ({ value, valueToConfirm }) => {
      expect(equality(value, { properties: { valueToConfirm }})).toBeTruthy()
  })
})
