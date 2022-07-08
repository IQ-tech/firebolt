import createValidationRule from "./index"

describe("create validator", () => {
  const isCenoura = createValidationRule(
    ({ value, action }) => {
      if (value === "cenoura") return action.approve()

      return action.refuse("defaultError")
    },
    { "defaultError": "value #{value} is not cenoura" }
  )

  test("correctly validate invalid value", () => {
    const { isValid, message, givenValue } = isCenoura("batata")
    expect(isValid).toBeFalsy()
    expect(message).toBe("value batata is not cenoura")
    expect(givenValue).toBe("batata")
  })

  test("correctly validate valid value", () => {
    const { isValid, message, givenValue } = isCenoura("cenoura")
    expect(isValid).toBeTruthy()
    expect(message).toBe("")
    expect(givenValue).toBe("cenoura")
  })
})

describe("validator localization", () => {
  test("custom validator correctly applies a localization map", () => {
    const isBatata = createValidationRule(
      ({ value, action }) => {
        if (value === "batata") return action.approve()

        return action.refuse("defaultError")
      },
      {
        "defaultError": "value #{value} is not 'batata'",
      }
    )

    const ptBRLocale = {
      "defaultError": "valor #{value} não é 'batata'",
    }

    const { isValid, message, givenValue } = isBatata("cenoura", {
      errorsMap: ptBRLocale,
    })
    expect(isValid).toBeFalsy()
    expect(message).toBe("valor cenoura não é 'batata'")
    expect(givenValue).toBe("cenoura")
  })
})
