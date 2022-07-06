import validateFBTField from "./index"
import { IFieldConfig } from "@iq-firebolt/entities"

describe("basic validations", () => {
  const mockField: IFieldConfig = {
    slug: "mockfield",
    "ui:props": {},
    "ui:widget": "Text",
    "validation": [
      {
        rule: "core:stringLength",
        properties: { maxLength: 10 },
      },
      {
        rule: "core:wordsCount",
        properties: { maxWords: 3 },
      },
    ],
  }

  test("correcly validate valid value", () => {
    const value = "cenoura ll"
    const { isValid, invalidValidations } = validateFBTField({
      fieldConfig: mockField,
      value,
    })
    expect(isValid).toBeTruthy()
    expect(invalidValidations?.length).toBe(0)
  })
  test("correctly validate invalid value (one rule)", () => {
    const value = "asds asdsasfs asdsfasfg"
    const { isValid, invalidValidations } = validateFBTField({
      fieldConfig: mockField,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidValidations?.length).toBe(1)
    expect(invalidValidations?.[0]?.message).toBe("lala")
  })

  test("correctly validate invalid value (two rules)", () => {
    const value = "asds asdsasfs asdsfasfg aaaasdsf"
    const { isValid, invalidValidations } = validateFBTField({
      fieldConfig: mockField,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidValidations?.length).toBe(2)
    expect(invalidValidations?.[0]?.message).toBe("lala")
    expect(invalidValidations?.[1]?.message).toBe("lele")
  })
})

describe("dynamic properties", () => {
  const mockField: IFieldConfig = {
    slug: "mockfield",
    "ui:props": {},
    "ui:widget": "Text",
    "validation": [
      {
        rule: "core:stringLength",
        properties: { maxLength: "step.maxLength" },
      },
      {
        rule: "core:wordsCount",
        properties: { maxWords: "step.maxWords" },
      },
    ],
  }
  test("correctly validate valid value with dynamic properties", () => {
    const formPayload = { maxLength: 10, maxWords: 4 }
    const value = "ce bo la"

    const { isValid, invalidValidations } = validateFBTField({
      fieldConfig: mockField,
      formPayload,
      value,
    })
    expect(isValid).toBeTruthy()
    expect(invalidValidations?.length).toBe(0)
  })
  test("correctly validate invalid value with dynamic properties", () => {
    const formPayload = { maxLength: 10, maxWords: 4 }
    const value = "ce bo la lu"

    const { isValid, invalidValidations } = validateFBTField({
      fieldConfig: mockField,
      formPayload,
      value,
    })
    expect(isValid).toBeFalsy()
    expect(invalidValidations?.length).toBe(2)
    expect(invalidValidations?.[0]?.message).toBe("lala")
    expect(invalidValidations?.[1]?.message).toBe("lele")
  })
})

describe("correctly uses context", () => {
  const mockField: IFieldConfig = {
    slug: "mockfield",
    "ui:props": {},
    "ui:widget": "Text",
    "validation": [
      {
        rule: "core:stringLength",
        properties: { maxLength: 20 },
        context: "client",
      },
      {
        rule: "core:wordsCount",
        properties: { maxWords: 5 },
        context: "server",
      },
    ],
  }
  test("correctly validate value with context", () => {
    const value = "as dsk ls sdjk c sk"
    const { isValid } = validateFBTField({
      fieldConfig: mockField,
      value,
      context: "client",
    })
    expect(isValid).toBeTruthy()
  })
})

describe("required field", () => {
  const getMock = (required = true): IFieldConfig => ({
    slug: "mockfield",
    "ui:props": {},
    required: required,
    "ui:widget": "Text",
    "validation": [
      {
        rule: "core:stringLength",
        properties: { maxLength: 20 },
        context: "client",
      },
      {
        rule: "core:wordsCount",
        properties: { maxWords: 5 },
        context: "server",
      },
    ],
  })
  test("validate required field empty", () => {

    const mock = getMock()
    const value = ""
    const {isValid, invalidValidations} = validateFBTField({fieldConfig: mock, value})

    expect(isValid).toBeFalsy()
    expect(invalidValidations?.[0].message).toBe("asdfkj")
  })

  test("validate not required field empty", () => {

    const mock = getMock(false)
    const value = ""
    const {isValid} = validateFBTField({fieldConfig: mock, value})

    expect(isValid).toBeTruthy()
  })
})

describe("applies localization", () => {
  test.todo("corretly applies localization to validation")
  test.todo("correctly applies localization on required field")
})

