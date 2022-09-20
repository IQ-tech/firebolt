import axios from "axios"
import { IDecisionHandlerConfig, IFireboltSession } from "@iq-firebolt/entities"
import { IExperienceProceedPayload, IExperienceDecision } from "../types"
import sampleWithDecisionHandler from "../mocks/sample-experience-with-remote-decision"
import { oneStepCompletedFlowDefault } from "../mocks/sample-experience-session"
import useMockNavigation from "../mocks/mock-navigation"

const {
  getFirstStepCorrectFields,
  getStepper,
  localStorage,
  mockedSetSession,
  getProceedDecision,
  getChangeFlowDecision,
  getBlockProgressionDecision,
} = useMockNavigation()

jest.mock("axios")

describe("Engine.decision handler", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("proceed with local decision", async () => {
    const fireboltStepper = getStepper(true)

    const firstStepFields = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepFields,
    }

    const decisionCallback = getProceedDecision()
    const proceed = await fireboltStepper.proceed(payload, decisionCallback)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
  })

  test("changeFlow with local decision", async () => {
    const fireboltStepper = getStepper(true)
    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const callbackFunction = getChangeFlowDecision()
    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data?.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
    expect(proceed?.experienceMetadata?.stepsList?.length).toBe(3)
    expect(proceed?.experienceMetadata?.lastStepSlug).toBe("token")
  })

  test("blockProgression with local decision", async () => {
    const fireboltStepper = getStepper(true)

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const callbackFunction = getBlockProgressionDecision()
    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.error?.id).toBe("blockProgressionDecision")
    expect(proceed?.step?.slug).toBe("personal_data")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(1)
  })

  test("save processedData with default definition", async () => {
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
    const fireboltStepper = getStepper(true, {
      strategy: "local",
      saveProcessedData: "all",
      triggers: "all",
    })
    const callbackFunction = getProceedDecision(mockExperienceDecision.options)
    const step = await fireboltStepper.proceed(
      { fields: fields },
      callbackFunction
    )
    const savedSession = JSON.parse(
      localStorage.getItem(step.sessionId) || "{}"
    ) as IFireboltSession
    expect(savedSession?.steps?.["personal_data"].processedData).toEqual({
      activeOffers: 2,
    })
  })

  test("do not save processedData", async () => {
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
    const fireboltStepper = getStepper(true, {
      strategy: "remote",
      saveProcessedData: [],
      triggers: "all",
    })
    const step = await fireboltStepper.proceed({ fields: fields })
    const savedSession = JSON.parse(
      localStorage.getItem(step.sessionId) || "{}"
    ) as IFireboltSession
    expect(savedSession?.steps?.["personal_data"].processedData).toBeUndefined()
  })

  test("remote - call axios with correct post parameters", async () => {
    ;(axios.post as jest.Mock).mockImplementation(() =>
      Promise.resolve("cenoura")
    )
    const remoteDecision = sampleWithDecisionHandler({})
      .decisionHandlerConfig as IDecisionHandlerConfig

    mockedSetSession(oneStepCompletedFlowDefault)

    const payload: IExperienceProceedPayload = {
      sessionId: oneStepCompletedFlowDefault.sessionId,
      fields: { brazil_id_number: "1234567890" },
    }

    const fireboltStepper = getStepper(true, {
      strategy: "remote",
      saveProcessedData: "all",
      triggers: "all",
    })
    await fireboltStepper.proceed(payload)

    expect(axios.post).toHaveBeenCalledWith(
      remoteDecision.remoteConfig?.url,
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

  test.todo("remote - call axios with default url")
  test.todo("remote - call axios with step url")
  test.todo("remote - trigger with default definition")
  test.todo("remote - trigger with step definition")
})
