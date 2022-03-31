import faker from "faker"
import SessionHandler from "./SessionHandler"
import { IExperienceJSONSchema } from "./types"
import { IEngineResolvers, IFireboltSession } from "./interfaces/IEngine"
import JSONSample from "./mocks/sample-experience"
import * as uuid from "uuid"
jest.mock("uuid")

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

const sessionId = faker.datatype.uuid()
jest.spyOn(uuid, "v4").mockReturnValue(sessionId)

describe("Class to handle with experience state", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("SessionHandler.createSession", async () => {
    const sample = JSONSample
    const resolvers: IEngineResolvers = {
      getFormJSONSchema: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    const state = new SessionHandler(resolvers)
    await state.createSession(sample)

    const firstStepSession = await resolvers.getSession(sessionId)
    if (!firstStepSession) throw new Error("Test failed, session not found")

    expect(firstStepSession).toHaveProperty("sessionId")
    expect(firstStepSession.experienceState.completedExperience).toBe(false)
    expect(firstStepSession.experienceState.currentFlow).toBe("default")
    expect(firstStepSession.experienceState.currentStepSlug).toBe(
      "personal_data"
    )
  })
  test.todo("SessionHandler.getSessionFromStorage")
  test.todo("SessionHandler.updateCurrentStep")
  test.todo("SessionHandler.changeCurrentFlow")
  test.todo("SessionHandler.addCompletedStep")
  test.todo("SessionHandler.completeExperience")
})
