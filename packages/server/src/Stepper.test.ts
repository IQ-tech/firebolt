import faker from "faker"
import Stepper from "./Stepper"
import { IExperienceJSONSchema } from "./types"
import { IEngineResolvers, IFireboltSession } from "./interfaces/IEngine"

import JSONSample from "./mocks/sample-experience"
const localStorage = global.localStorage
const mockedGetFormJSONSchema = jest.fn(
  async () => ({} as IExperienceJSONSchema)
)

const mockedGetSession = jest.fn(async (sessionId?: string) => {
  const session = localStorage.getItem(sessionId)
  if (session) return JSON.parse(session) as IFireboltSession
  return undefined
})

const mockedSetSession = jest.fn(async (stepData: IFireboltSession) => {
  localStorage.setItem(stepData.sessionId, JSON.stringify(stepData))
})

describe("Stepper.Proceed handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test.todo("should return a error when schema is not found")
  test.todo("should return a error when schema dont have default flow")

  test("should start a new experience", async () => {
    const sample = JSONSample as IExperienceJSONSchema
    const resolvers: IEngineResolvers = {
      getFormJSONSchema: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONSchema: sample,
      resolvers,
    })

    const firstStep = await fireboltStepper.proceed()

    expect(firstStep).toHaveProperty("sessionId")
    expect(firstStep.step.slug).toBe("personal_data")
    expect(firstStep.capturedData).toEqual({})
  })

  test.todo("should identify an started experience and return the correct step")
  test.todo("should validate the step fields and return an error")
  test.todo("should validate the step fields and return the next step info")
  test.todo("should be able update previous steps without data loss")
})

describe("Props presets apply", () => {
  test.todo("props presets should be applied on Engine.start return value")

  test.todo("props presets should be applied on Engine.proceed return value")

  test.todo("props presets should be applied on Engine.goBack return value")

  test.todo("props presets should be applied on Engine.debug return value")
})

describe("Stepper hooks working", () => {})
