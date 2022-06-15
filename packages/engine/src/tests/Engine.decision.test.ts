import axios from "axios"
import {
  IExperienceDecisionCallbackFunction,
  IExperienceProceedPayload,
} from "../interfaces/IEngine"

import useMockNavigation from "../mocks/mock-navigation"

const { getFirstStepCorrectFields, getStepper, localStorage } =
  useMockNavigation()

jest.mock("axios")

describe("Engine.decision handler", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })
  test("should handle with proceed decision", async () => {
    const fireboltStepper = getStepper()

    const firstStepFields = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepFields,
    }

    const proceed = await fireboltStepper.proceed(payload)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
  })

  test("should handle with changeFlow callback decision", async () => {
    const fireboltStepper = getStepper()
    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }
    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      if (payload.receivingStepData?.fields?.email) {
        decide("changeFlow", { newFlow: "medium" })
      }
    }
    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data?.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
    expect(proceed?.experienceMetadata?.stepsList?.length).toBe(3)
    expect(proceed?.experienceMetadata?.lastStepSlug).toBe("token")
  })

  test("should handle with blockProgression callback decision", async () => {
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const mockedErrors = {
      email: "user already exists",
    }

    fireboltStepper.proceed(
      { fields: { "cpf": "23212" } },
      (decide, payload) => {
        if (payload.receivingStepData.fields?.cpf !== "cenoura") {
          decide("blockProgression")
        }
      }
    )

    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      if (payload.receivingStepData?.fields?.email) {
        decide("blockProgression", { errors: mockedErrors })
      }
      decide("changeFlow", { newFlow: "medium" })
    }

    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.error?.id).toBe("blockProgressionDecision")
    expect(proceed?.step?.slug).toBe("personal_data")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(1)
  })

  test("should be able to call api provided by webhook", async () => {
  
    (axios.post as jest.Mock).mockResolvedValue({
      data: "Result request callWebhook",
    })

    const fireboltStepper = getStepper("external")
    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      decide("proceed")
    }

    const firstStep = await fireboltStepper.start()
    const proceed = await fireboltStepper.proceed(payload, callbackFunction)
  
    expect(fireboltStepper["decisionCallbackStrategy"]).toEqual("external");
  })

  test.todo("webhook fail")
  test.todo("webhook with save processedData true")
  test.todo("webhook with save processedData false")
  test.todo("correct url")
})
