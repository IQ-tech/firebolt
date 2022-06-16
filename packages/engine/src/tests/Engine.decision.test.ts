import axios from "axios"
import {
  IExperienceDecisionCallbackFunction,
  IExperienceProceedPayload,
  IFireboltSession,
  IExperienceDecision,
} from "../interfaces/IEngine"
import sampleWithWebhookConfig from "../mocks/sample-experience-with-webhook"
import { oneStepCompletedFlowDefault } from "../mocks/sample-experience-session"
import useMockNavigation from "../mocks/mock-navigation"
import { IWebhookConfig } from "../types"

const {
  getFirstStepCorrectFields,
  getStepper,
  localStorage,
  mockedSetSession,
} = useMockNavigation()

jest.mock("axios")

describe("Engine.decision handler", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })
  test("should handle with proceed callback decision", async () => {
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

  test("axios post parameters", async () => {
    ;(axios.post as jest.Mock).mockImplementation(() =>
      Promise.resolve("cenoura")
    )
    const webhookConfig =
      sampleWithWebhookConfig().webhookConfig as IWebhookConfig

    mockedSetSession(oneStepCompletedFlowDefault)

    const payload: IExperienceProceedPayload = {
      sessionId: oneStepCompletedFlowDefault.sessionId,
      fields: { brazil_id_number: "1234567890" },
    }

    const fireboltStepper = getStepper("external")
    await fireboltStepper.proceed(payload)
    expect(fireboltStepper["decisionCallbackStrategy"]).toEqual("external")

    expect(axios.post).toHaveBeenCalledWith(
      webhookConfig.url,
      {
        "receivingStepData": {
          "fields": { "brazil_id_number": "1234567890" },
          "sessionId": "mockSessionId1234-1",
        },
        "sessionData": {
          "experienceState": {
            "completedExperience": false,
            "currentFlow": "default",
            "lastCompletedStepSlug": "personal_data",
            "visualizingStepSlug": "documents",
          },
          "sessionId": "mockSessionId1234-1",
          "steps": {
            "personal_data": {
              "fields": {
                "email": "teste@cenoura.com",
                "full_name": "Teste Cenoura",
              },
            },
          },
        },
      },
      {
        "headers": {
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
      }
    )
  })

  test("webhook with save processedData true", async () => {
    const fields = getFirstStepCorrectFields()
    const mockExperienceDecision: IExperienceDecision = {
      action: "proceed",
      options: {
        processedData: { activeOffers: 2 },
      },
    }

    ;(axios.post as jest.Mock).mockImplementation(() => {
      return Promise.resolve({ data: mockExperienceDecision })
    })
    const fireboltStepper = getStepper("external")
    const step = await fireboltStepper.proceed({ fields: fields })
    const savedSession = JSON.parse(
      localStorage.getItem(step.sessionId) || "{}"
    ) as IFireboltSession
    expect(savedSession?.steps?.["personal_data"].processedData).toEqual({
      activeOffers: 2,
    })
  })
  test("webhook with save processedData false", async () => {
    const fields = getFirstStepCorrectFields()
    const mockExperienceDecision: IExperienceDecision = {
      action: "proceed",
      options: {
        processedData: { activeOffers: 2 },
      },
    }

    ;(axios.post as jest.Mock).mockImplementation(() => {
      return Promise.resolve({ data: mockExperienceDecision })
    })
    const fireboltStepper = getStepper("external", false)
    const step = await fireboltStepper.proceed({ fields: fields })
    const savedSession = JSON.parse(
      localStorage.getItem(step.sessionId) || "{}"
    ) as IFireboltSession
    expect(savedSession?.steps?.["personal_data"].processedData).toBeUndefined()
  })
})
