import faker from "faker"
import SessionHandler from "./SessionHandler"
import { IExperienceJSONSchema } from "./types"
import { IEngineResolvers, IFireboltSession } from "./interfaces/IEngine"
import JSONSample from "./mocks/sample-experience"
import * as uuid from "uuid"
import { oneStepCompletedFlowDefault } from "./mocks/sample-experience-session"
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

describe("SessionHandler. Class to handle with experience state", () => {
  const sample = JSONSample
  const resolvers: IEngineResolvers = {
    getFormJSONSchema: mockedGetFormJSONSchema,
    getSession: mockedGetSession,
    setSession: mockedSetSession,
  }

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("SessionHandler.createSession and SessionHandler.loadSessionFromStorage", async () => {
    const session = new SessionHandler(resolvers)
    await session.createSession(sample)

    await session.loadSessionFromStorage(sessionId)
    if (!session.current) throw new Error("Test failed, session not found")

    expect(session.current).toHaveProperty("sessionId")
    expect(session.current.experienceState.completedExperience).toBe(false)
    expect(session.current.experienceState.currentFlow).toBe("default")
    expect(session.current.experienceState.visualizingStepSlug).toBe(
      "personal_data"
    )
  })

  test("SessionHandler.setVisualizingStepSlug", async () => {
    mockedSetSession(oneStepCompletedFlowDefault)
    const session = new SessionHandler(resolvers)

    await session.loadSessionFromStorage(sessionId)
    const stepSlug = faker.lorem.word()

    await session.setVisualizingStepSlug(stepSlug)
    expect(session.current.experienceState.visualizingStepSlug).toBe(stepSlug)
  })

  test("SessionHandler.changeCurrentFlow", async () => {
    mockedSetSession(oneStepCompletedFlowDefault)
    const session = new SessionHandler(resolvers)
    await session.loadSessionFromStorage(sessionId)

    const flowSlug = faker.lorem.word()
    await session.changeCurrentFlow(flowSlug)

    expect(session.current.experienceState.currentFlow).toBe(flowSlug)
  })

  test.todo("SessionHandler.addCompletedStep")
  test.todo("SessionHandler.completeExperience")
})
