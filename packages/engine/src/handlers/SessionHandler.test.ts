import { faker } from "@faker-js/faker"
import * as uuid from "uuid"
import SessionHandler from "./SessionHandler"
import {
  IExperienceConfig,
  IFireboltSession,
  IStepSession,
} from "@iq-firebolt/entities"
import { IEngineResolvers } from "../types"
import JSONSample from "../mocks/sample-experience"
import JSONConfig from "../classes/JSONConfig"
import { oneStepCompletedFlowDefault } from "../mocks/sample-experience-session"
jest.mock("uuid")

const localStorage = global.localStorage
const mockedGetFormJSONSchema = jest.fn(async () => ({} as IExperienceConfig))

const mockedGetSession = jest.fn(async (sessionId?: string) => {
  const session = localStorage.getItem(sessionId ?? "")
  if (session) return JSON.parse(session) as IFireboltSession
  return undefined
})

const mockedSetSession = jest.fn(async (stepData: IFireboltSession) => {
  localStorage.setItem(stepData.sessionId, JSON.stringify(stepData))
})

describe("SessionHandler. Class to handle with experience state", () => {
  const sample = JSONSample
  const mockedSessionId = oneStepCompletedFlowDefault.sessionId
  const resolvers: IEngineResolvers = {
    getExperienceJSON: mockedGetFormJSONSchema,
    getSession: mockedGetSession,
    setSession: mockedSetSession,
  }

  beforeEach(() => {
    localStorage.clear()
    mockedSetSession(oneStepCompletedFlowDefault)
  })

  test("SessionHandler.createSession and SessionHandler.loadSessionFromStorage", async () => {
    localStorage.clear()
    const sessionId = faker.datatype.uuid()
    jest.spyOn(uuid, "v4").mockReturnValue(sessionId)
    const session = new SessionHandler(resolvers)
    const instanceSampleConfig = new JSONConfig(sample)
    await session.createSession(instanceSampleConfig)

    await session.loadSessionFromStorage(sessionId)
    if (!session.current) throw new Error("Test failed, session not found")

    expect(session.current).toHaveProperty("sessionId")
    expect(session.current.sessionId.length > 0).toBe(true)
    expect(session.current.experienceState.completedExperience).toBe(false)
    expect(session.current.experienceState.currentFlow).toBe("default")
    expect(session.current.experienceState.visualizingStepSlug).toBe(
      "personal_data"
    )
  })

  test("SessionHandler.setVisualizingStepSlug", async () => {
    const session = new SessionHandler(resolvers)

    await session.loadSessionFromStorage(mockedSessionId)
    const stepSlug = faker.lorem.word(5)

    await session.setVisualizingStepSlug(stepSlug)
    expect(session.current.experienceState.visualizingStepSlug).toBe(stepSlug)
  })

  test("SessionHandler.changeCurrentFlow", async () => {
    const session = new SessionHandler(resolvers)
    await session.loadSessionFromStorage(mockedSessionId)

    const flowSlug = faker.lorem.word(5)
    await session.changeCurrentFlow(flowSlug)

    expect(session.current.experienceState.currentFlow).toBe(flowSlug)
  })

  test("SessionHandler.completeExperience", async () => {
    const session = new SessionHandler(resolvers)
    await session.loadSessionFromStorage(mockedSessionId)

    const flowSlug = faker.lorem.word(6)
    await session.completeExperience()

    expect(session.current.sessionId).toBe(mockedSessionId)
    expect(session.current.experienceState.completedExperience).toBe(true)
  })

  test("SessionHandler.addCompletedStep", async () => {
    const session = new SessionHandler(resolvers)
    await session.loadSessionFromStorage(mockedSessionId)

    const stepSlug = "documents"
    const stepSession: IStepSession = {
      fields: {
        brazil_id_number: "1234567890",
      },
    }

    await session.addCompletedStep(stepSlug, stepSession)

    expect(session.current.sessionId).toBe(mockedSessionId)
    expect(session.current.steps).toHaveProperty("personal_data")
    expect(session.current.steps).toHaveProperty("documents")
    expect(session.current.experienceState.lastCompletedStepSlug).toBe(
      "documents"
    )
  })
})
