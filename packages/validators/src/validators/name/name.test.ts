import isValidName from "./index"

describe("name validation", () => {
  test.each([
    "123",
    "Revircreison",
    "Oba top!",
    "Papai noel 1",
    "R Berte",
    "e Berte",
    "Ruan e",
    "Sr Ruan Berte",
    "Two  Spaces",
    "batata /tyeste",
    "asdsadsad\\ dasdsadsa"
  ])("item %p should not pass in name validator", (value) => {
    expect(isValidName.run(value).isValid).toBeFalsy()
  })

  test.each([
    "Revircreison Jr",
    "Oba top",
    "Papai noel",
    "Papai e noel",
    "Jovem Alessandra",
  ])("item %p should pass in name validator", (value) => {
    expect(isValidName.run(value).isValid).toBeTruthy()
  })
})

describe("Test names with properties", () => {
  test.each([
    {
      value: "essenomenaodeveriapax dale",
      properties: { maxWordLength: 20 },
    },
  ])("This name should not pass in name validator", ({ value, properties }) => {
    expect(isValidName.run(value, properties).isValid).toBeFalsy()
  })

  test.each([
    {
      value: "essenomedevepassarjh dale",
      properties: { maxWordLength: 20 },
    },
  ])("This name should pass in name validator", ({ value, properties }) => {
    expect(isValidName.run(value, properties).isValid).toBeTruthy()
  })
})
