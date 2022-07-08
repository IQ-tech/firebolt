import validateFBTField from "./index"
import { IFieldConfig } from "@iq-firebolt/entities"
import createValidationRule from "../../core/createValidationRule"
import { IGenericObject } from "../../types"

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
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockField,
      value,
    })
    expect(isValid).toBeTruthy()
    expect(invalidRules?.length).toBe(0)
  })
  test("correctly validate invalid value (one rule)", () => {
    const value = "asds asdsasfs asdsfasfg"
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockField,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.length).toBe(1)
    expect(invalidRules?.[0]?.message).toBe(
      "Value 'asds asdsasfs asdsfasfg' is greater than the max length: 10 chars"
    )
  })

  test("correctly validate invalid value (two rules)", () => {
    const value = "asds asdsasfs asdsfasfg aaaasdsf"
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockField,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.length).toBe(2)
    expect(invalidRules?.[0]?.message).toBe(
      "Value 'asds asdsasfs asdsfasfg aaaasdsf' is greater than the max length: 10 chars"
    )
    expect(invalidRules?.[1]?.message).toBe(
      "asds asdsasfs asdsfasfg aaaasdsf, exceeds the maximum number of words allowed, enter 3 words"
    )
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

    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockField,
      formPayload,
      value,
    })
    expect(isValid).toBeTruthy()
    expect(invalidRules?.length).toBe(0)
  })
  test("correctly validate invalid value with dynamic properties", () => {
    const formPayload = { maxLength: 10, maxWords: 4 }
    const value = "ce bo la lu je"

    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockField,
      formPayload,
      value,
    })
    expect(isValid).toBeFalsy()
    expect(invalidRules?.length).toBe(2)
    expect(invalidRules?.[0]?.message).toBe(
      "Value 'ce bo la lu je' is greater than the max length: 10 chars"
    )
    expect(invalidRules?.[1]?.message).toBe(
      "ce bo la lu je, exceeds the maximum number of words allowed, enter 4 words"
    )
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
      },
      {
        rule: "core:wordsCount",
        properties: { maxWords: 5, minWords: 1 },
      },
    ],
  })
  test("validate required field empty", () => {
    const mock = getMock()
    const value = ""
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mock,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.[0].message).toBe("This field is required")
  })

  test("not validate no required field empty", () => {
    const mock = getMock(false)
    const value = ""
    const { isValid } = validateFBTField({
      fieldConfig: mock,
      value,
    })

    expect(isValid).toBeTruthy()
  })

  test("validate no required field with value", () => {
    const mock = getMock(false)
    const value = "asafs asaasgsgsgsgsgsgsgs s s s s"
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mock,
      value,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.[0].message).toBe(
      "Value 'asafs asaasgsgsgsgsgsgsgs s s s s' is greater than the max length: 20 chars"
    )
  })
})

describe("custom validation rules", () => {
  const mockFieldSimple = {
    slug: "mockfield",
    "ui:props": {},
    required: true,
    "ui:widget": "Text",
    "validation": [
      {
        rule: "core:stringLength",
        properties: { maxLength: 20 },
      },
      {
        rule: "isPotato",
      },
    ],
  }

  const isPotato = createValidationRule(
    ({ value, action }) => {
      if (value === "potato") {
        return action.approve()
      }

      return action.refuse("defaultError")
    },
    { "defaultError": "#{value} is not potato" }
  )

  const havePotato = createValidationRule(
    ({ value, properties, action }) => {
      const potatoCount = (properties as any)?.potatoCount || 0
      const safeValue: string = value || ""
      const countPotato = safeValue.match(/potato/g)?.length
      if (countPotato === potatoCount) {
        return action.approve()
      }
      return action.refuse("defaultError")
    },
    { "defaultError": "should have potato" }
  )

  const haveCarrot = createValidationRule(
    ({ value, properties, action }) => {
      const potatoCount = (properties as any)?.carrotCount || 0
      const safeValue: string = value || ""
      const countPotato = safeValue.match(/carrot/g)?.length
      if (countPotato === potatoCount) {
        return action.approve()
      }
      return action.refuse("defaultError")
    },
    { "defaultError": "should have carrot" }
  )

  test("correctly applies custom validation rules (valid value)", () => {
    const customValidatorsMap: IGenericObject = {
      isPotato,
    } // todo remove force typing

    const { isValid } = validateFBTField({
      fieldConfig: mockFieldSimple,
      value: "potato",
      customValidatorsMap,
    })

    expect(isValid).toBeTruthy()
  })

  test("correctly applies custom validation rules (invalid value)", () => {
    const customValidatorsMap = {
      isPotato,
    } // todo remove force typing

    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockFieldSimple,
      value: "carrot",
      customValidatorsMap,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.[0].message).toBe("carrot is not potato")
  })
  test("correctly applies custom validation rules with properties (valid value)", () => {
    const mockFieldComplex = {
      slug: "mockfield",
      "ui:props": {},
      required: true,
      "ui:widget": "Text",
      "validation": [
        {
          rule: "core:stringLength",
          properties: { maxLength: 50 },
        },
        {
          rule: "havePotato",
          properties: {
            potatoCount: 2,
          },
        },
      ],
    }
    const value = "lala potato sdkjf potato"

    const customMap = {
      havePotato,
    }
    const { isValid } = validateFBTField({
      fieldConfig: mockFieldComplex,
      value,
      customValidatorsMap: customMap,
    })

    expect(isValid).toBeTruthy()
  })
  test("correctly applies custom validation rules with more than one validator with properties", () => {
    const mockFieldComplex = {
      slug: "mockfield",
      "ui:props": {},
      required: true,
      "ui:widget": "Text",
      "validation": [
        {
          rule: "core:stringLength",
          properties: { maxLength: 50 },
        },
        {
          rule: "havePotato",
          properties: {
            potatoCount: 1,
          },
        },
        {
          rule: "haveCarrot",
          properties: {
            carrotCount: 1,
          },
        },
      ],
    }

    const value = "lala potata sdkjf potata"

    const customMap = {
      havePotato,
      haveCarrot,
    }
    const { isValid, invalidRules } = validateFBTField({
      fieldConfig: mockFieldComplex,
      value,
      customValidatorsMap: customMap,
    })

    expect(isValid).toBeFalsy()
    expect(invalidRules?.length).toBe(2)
    expect(invalidRules?.[0].message).toBe("should have potato")
    expect(invalidRules?.[1].message).toBe("should have carrot")
  })
})

describe("applies localization", () => {
  test.todo("corretly applies localization to validation")
  test.todo("correctly applies localization on required field")
})
