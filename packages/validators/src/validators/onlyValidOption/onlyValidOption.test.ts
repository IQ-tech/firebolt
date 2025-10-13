import onlyValidOption from "./index"

describe("select autocomplete validation", () => {
  const options = [
    { label: "Feminio", value: 1 },
    { label: "Masculino", value: 2 },
    { label: "Outro", value: 3 },
  ]
  test.each([1, 2, 3])(
    "Given item %p should pass in onlyValidOption validator",
    (value) => {
      expect(onlyValidOption.run(value, { options }).isValid).toBeTruthy()
    }
  )

  test.each([5, 8, "outro", "3"])(
    "Given item %p should not pass in onlyValidOption validator",
    (value) => {
      expect(onlyValidOption.run(value, { options }).isValid).toBeFalsy()
    }
  )
})
