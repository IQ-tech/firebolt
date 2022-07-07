import { IFieldConfig, IStepConfig } from "@iq-firebolt/entities"
import validateFBTStep from "./index"
import allRightFieldsMock from "./__mocks__/all-right-fields"
import conditionalFieldsMock from "./__mocks__/all-right-fields"
import sourceFieldMock from "./__mocks__/source-field"
import contextMock from "./__mocks__/context-validation"
import customValidatorRulesMock from "./__mocks__/custom-validator-rules"
import createValidator from "../../core/createValidator"

const encapsulateStep = (
  fields: IFieldConfig[] = [],
  type: "form" | "custom" = "form"
): IStepConfig => ({
  "slug": "mockStep",
  "friendlyName": "mock field",
  "type": type,
  "fields": fields,
})

describe("Regular step validation", () => {
  test("ignore custom step", () => {
    const stepConfig = encapsulateStep([], "custom")
    const { isValid, invalidFields } = validateFBTStep({
      stepConfig,
      formPayload: {},
    })

    expect(isValid).toBe(true)
    expect(invalidFields.length).toBe(0)
  })
  test("validateFBTStep works correctly with all valid firebolt step", () => {
    const formPayload = {
      "nickname": "c1234",
      "email": "cebola@teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "cebola roxa",
    }

    const stepConfig = encapsulateStep(allRightFieldsMock)

    const { isValid, invalidFields } = validateFBTStep({
      stepConfig,
      formPayload,
    })
    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })

  test("validateFBTStep works correctly with all wrong firebolt step", () => {
    const formPayload = {
      "nickname": "cebola1234",
      "email": "cebola@-teste.com",
      "full_name": "cebola",
      "mothers_name": "cebola",
    }
    const stepConfig = encapsulateStep(allRightFieldsMock)
    const { isValid, invalidFields } = validateFBTStep({
      stepConfig,
      formPayload,
    })
    expect(isValid).toBeFalsy()
    expect(invalidFields.length).toBe(4)
    expect(invalidFields?.[0]?.invalidRules?.[0].message).toBe("asdjhfj")
  })
})

describe("Validate correctly based on platform context", () => {
  const stepConfig = encapsulateStep(contextMock)
  test("Valid value on client context", () => {
    const formPayload = {
      "nickname": "c1234",
      "email": "cebola@teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
      context: "client",
    })

    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })
  test("Invalid value on client context", () => {
    const formPayload = {
      "nickname": "c1234",
      "email": "",
      "full_name": "cebola carlos",
      "mothers_name": "cebola maria",
    }

    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
      context: "client",
    })

    expect(isValid).toBeFalsy()
    expect(invalidFields.length).toBe(1)
    expect(invalidFields?.[0]?.invalidRules?.[0].message).toBe("asdjhfj")
  })
  test("Valid value on server context", () => {
    const formPayload = {
      "nickname": "c1234",
      "full_name": "cebola carlos",
      "mothers_name": "cebola roxa",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
      context: "server",
    })

    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })
  test("Invalid value on server context", () => {
    const formPayload = {
      "nickname": "c1234",
      "full_name": "cebola carlos",
      "mothers_name": "cebola",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
      context: "server",
    })

    expect(isValid).toBeFalsy()
    expect(invalidFields.length).toBe(1)
    expect(invalidFields?.[0]?.invalidRules?.[0].message).toBe("asdjhfj")
  })
})

describe("Required fields validation", () => {
  const stepConfig = encapsulateStep(conditionalFieldsMock)
  test("Validate correctly conditional fields (valid)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "cebola roxa",
    }
    const stepConfig = encapsulateStep(conditionalFieldsMock)
    const { isValid } = validateFBTStep({ stepConfig, formPayload })
    expect(isValid).toBeTruthy()
  })
  test("Validate correctly conditional fields (invalid)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@-**teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "cebola roxa",
    }
    const stepConfig = encapsulateStep(conditionalFieldsMock)
    const { isValid, invalidFields } = validateFBTStep({
      stepConfig,
      formPayload,
    })
    expect(isValid).toBeFalsy()
    expect(invalidFields.length).toBe(1)
    expect(invalidFields?.[0]?.invalidRules?.[0].message).toBe("sdsfs")
  })
  test("Ignore filled conditional field (without condition match)", () => {
    const formPayload = {
      "nickname": "c123",
      "email": "cebola@-**teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
    })

    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })
  test("Validate correctly empty optional field", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
    })

    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })

  test("Validate correctly filled optional field", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola carlos",
      "mothers_name": "cebola roxa",
    }
    const { isValid, invalidFields } = validateFBTStep({
      formPayload,
      stepConfig,
    })

    expect(isValid).toBeTruthy()
    expect(invalidFields.length).toBe(0)
  })
})

describe("Step localization", () => {
  test.todo("Correctly applies localization")
})

describe("custom validation rules", () => {
  const stepConfig = encapsulateStep(customValidatorRulesMock)
  const hasCenoura = createValidator(
    ({ value, action }) => {
      if (value.includes("cenoura")) {
        return action.approve()
      }

      return action.refuse("defaultError")
    },
    { "defaultError": "is not cenoura" }
  )

  const customValidatorsMap = {
    hasCenoura,
  }
  test("Correctly applies custom validation rules (valid value)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cenoura teste",
      "mothers_name": "cebola roxa",
    }

    const { isValid } = validateFBTStep({
      stepConfig,
      formPayload,
      customValidatorsMap,
    })
    expect(isValid).toBeTruthy()
  })
  test("Correctly applies custom validation rules (invalid value)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola teste",
      "mothers_name": "cebola roxa",
    }

    const { isValid, invalidFields } = validateFBTStep({
      stepConfig,
      formPayload,
      customValidatorsMap,
    })
    expect(isValid).toBeFalsy()
    expect(invalidFields?.[0]?.invalidRules?.[0].message).toBe("sadsfs")
  })
})

describe("correctly source properties from another fields", () => {
  const stepConfig = encapsulateStep(sourceFieldMock)

  test("validate max words (valid)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola teste",
      "mothers_name": "cebola roxa",
      "max_words": 3,
      "tested_field": "asdsf sjshdf adfasd",
    }

    const {isValid} = validateFBTStep({stepConfig, formPayload})

    expect(isValid).toBeTruthy()
  })

  test("validate max words (invalid)", () => {
    const formPayload = {
      "nickname": "cebola123",
      "email": "cebola@teste.com",
      "full_name": "cebola teste",
      "mothers_name": "cebola roxa",
      "max_words": 3,
      "tested_field": "asdsf sjshdf adfasd asdsf",
    }

    const {isValid} = validateFBTStep({stepConfig, formPayload})

    expect(isValid).toBeTruthy()
  })
})
