import createValidationRule from "./index"

describe("create validator", () => {
  const isCenoura = createValidationRule(
    ({ value, action }) => {
      if (value === "cenoura") return action.approve()

      return action.reprove("defaultError")
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

        return action.reprove("defaultError")
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

describe("freeze complex rule", () => {
  test("Correctly freezes complex rule into a simpler one", () => {
    const complexValidation = createValidationRule(
      ({ properties, action, value }) => {
        const maxSize = properties?.maxSize
        const minSize = properties?.minSize
        if (!!maxSize && value.length > maxSize) {
          return action.reprove("error1")
        }

        if (!!minSize && value.length < minSize) {
          return action.reprove("error2")
        }

        return action.approve()
      },
      {
        "error1": "error case one #{value}",
        "error2": "error case two #{value}",
      }
    )
    

    const max5Length = complexValidation.freeze({ maxSize: 5 })

    const { isValid, message } = max5Length("aksdjsfk")
    expect(isValid).toBeFalsy()
    expect(message).toBe("error case one aksdjsfk")
  })
})
