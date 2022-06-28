import Engine from "../index"
import faker from "faker"
import {
  IExperienceDecisionCallbackFunction,
  IExperienceProceedPayload,
  IFireboltSession,
} from "../interfaces/IEngine"
import { IExperienceJSONSchema } from "../mocks/sample-experience"
import { twoStepsCompletedFlowDefault } from "../mocks/sample-experience-session"
import sampleExperienceMock from "../mocks/sample-experience"
import mockWithDecisionConfig from "../mocks/sample-with-decision-config.js"
import {
  sampleWithoutDefaultFlow,
  defaultFlowWithoutSteps,
  experienceWithoutSteps,
} from "../mocks/invalid/sample-without-default-flow"
import { sampleWithMissingStep } from "../mocks/invalid/sample-with-missing-step"

const localStorage = global.localStorage

const mockedGetSession = jest.fn(async (sessionId?: string) => {
  const session = localStorage.getItem(sessionId ?? "")
  if (session) return JSON.parse(session) as IFireboltSession
  return undefined
})

const mockedSetSession = jest.fn(async (stepData: IFireboltSession) => {
  localStorage.setItem(stepData.sessionId, JSON.stringify(stepData))
})

describe("should identify JSON Errors", () => {
  test("should return an error when no way to get JSON Config is provided", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("noWayToFindJSONConfig")
  })

  test("should return an error when JSON config is not found", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
        getExperienceJSON: async () => null as unknown as IExperienceJSONSchema,
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("JSONNotFound")
  })

  test("should return an error when JSON config don't have default flow", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: { ...sampleWithoutDefaultFlow },
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()

    expect(receivedStep?.error?.id).toBe("JSONWithoutDefaultFlow")
  })

  test("should return an error when flow does not have steps", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: experienceWithoutSteps,
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()
    expect(receivedStep?.error?.id).toBe("stepListNotProvided")
  })

  test("should return an error when JSON config does not have steps", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: { ...defaultFlowWithoutSteps },
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()
    expect(receivedStep?.error?.id).toBe("flowWithoutSteps")
  })
  test("should return an error when flow step does not exists on JSON config", async () => {
    const engine = new Engine({
      experienceId: "sample",
      experienceJSONConfig: sampleWithMissingStep,
      resolvers: {
        getSession: mockedGetSession,
        setSession: mockedSetSession,
      },
    })

    const start = await engine.start()
    const proceeding = await engine.proceed({
      fields: { full_name: "mock name", email: "test@test.com" },
    })

    expect(proceeding.error?.id).toBe("stepNotFound")
  })
  test("should return an error when flow does not exists on JSON Config", async () => {
    const engine = new Engine({
      experienceId: "sample",
      experienceJSONConfig: mockWithDecisionConfig({ strategy: "local" }),
      resolvers: {
        getSession: mockedGetSession,
        setSession: mockedSetSession,
      },
    })

    await engine.start()

    const decisionCallback: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      decide("changeFlow", { newFlow: "nonExistent" })
    }
    const proceed = await engine.proceed(
      {
        fields: { full_name: "mock name", email: "test@test.com" },
      },
      decisionCallback
    )

    expect(proceed.error?.id).toBe("JSONWithoutSpecifiedFlow")
  })
})

describe("should identify resolver errors", () => {
  test("should return an error when getSession resolver is missing", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: sampleExperienceMock,
      /** @ts-ignore */
      resolvers: {
        setSession: async () => {},
      },
    })
    const start = await engine.start()
    expect(start?.error?.id).toBe("resolverMissing")
  })
  test("should return an error when getSession resolves wrong data", async () => {
    localStorage.setItem(
      twoStepsCompletedFlowDefault.sessionId,
      JSON.stringify(twoStepsCompletedFlowDefault)
    )
    const engine = new Engine({
      experienceId: twoStepsCompletedFlowDefault.sessionId,
      experienceJSONConfig: sampleExperienceMock,
      resolvers: {
        getSession: async () => {
          /** @ts-ignore */
          return {
            teste: "erro",
          } as IFireboltSession
        },
        setSession: async () => {},
      },
    })
    const proceedingStep = await engine.proceed()
    expect(proceedingStep?.error?.id).toBe("resolverReturnIsInvalid")
  })
  test("should return an error when setSession resolver is missing", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: sampleExperienceMock,
      /** @ts-ignore */
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
      },
    })
    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("resolverMissing")
  })
})

describe("should identify addons errors", () => {
  test.todo("should return an error when invalid addon is provided")
})

describe("should identify generic errors", () => {
  test("should identify error ocurred inside resolver", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
        getExperienceJSON: async () => {
          const mockArray = [{ id: "test" }]
          mockArray[5].id
          return {} as IExperienceJSONSchema
        },
      },
    })
    const receivedStep = await engine.start()
    expect(receivedStep?.error?.id).toBe("externalError")
  })
  test("should identify error ocurred inside decision callback", async () => {
    const engine = new Engine({
      experienceId: "sample",
      experienceJSONConfig: mockWithDecisionConfig({
        strategy: "local",
        triggers: "all",
        saveProcessedData: "all",
      }),
      resolvers: {
        getSession: mockedGetSession,
        setSession: async () => {},
      },
    })
    const decisionCallback: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      /** @ts-ignore */
      const genericError = payload.receivingStepData.fields.testError["prop"]
      decide("changeFlow", { newFlow: "medium" })
    }
    const payload: IExperienceProceedPayload = {
      fields: {
        full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
      },
    }
    const proceedingStep = await engine.proceed(payload, decisionCallback)
    expect(proceedingStep.error?.id).toBe("externalError")
  })
  // test.todo("should identify error ocurred inside webhook")
})
