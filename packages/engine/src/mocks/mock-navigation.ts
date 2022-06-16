import faker from "faker"
import Engine from "../index"
import { IExperienceJSONSchema, IStepFormPayload } from "../types"
import {
  IDecisionCallbackStrategy,
  IEngineResolvers,
  IFireboltSession,
} from "../interfaces/IEngine"
import JSONSample from "../mocks/sample-experience"
import  sampleWithWebhookConfig  from "../mocks/sample-experience-with-webhook"

export default function useMockNavigation() {
  const localStorage = global.localStorage
  const mockedGetFormJSONSchema = jest.fn(
    async () => ({} as IExperienceJSONSchema)
  )

  const mockedGetSession = jest.fn(async (sessionId?: string) => {
    const session = localStorage.getItem(sessionId ?? "")
    if (session) return JSON.parse(session) as IFireboltSession
    return undefined
  })

  const mockedSetSession = jest.fn(async (stepData: IFireboltSession) => {
    localStorage.setItem(stepData.sessionId, JSON.stringify(stepData))
  })

  const getFirstStepCorrectFields = (): IStepFormPayload => ({
    full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
  })

  const getFirstStepWrongFields = (): IStepFormPayload => ({
    full_name: "Teste",
    email: "teste@",
  })

  const getResolvers = (): IEngineResolvers => ({
    getExperienceJSON: mockedGetFormJSONSchema,
    getSession: mockedGetSession,
    setSession: mockedSetSession,
  })

  const getStepper = (decisionCallbackStrategy?: IDecisionCallbackStrategy) => {
    return new Engine({
      experienceId: "sample",
      experienceJSONConfig: decisionCallbackStrategy === "external" ? sampleWithWebhookConfig : JSONSample,
      resolvers: getResolvers(),
      decisionCallbackStrategy,
    })
  }

  return {
    localStorage,
    mockedGetFormJSONSchema,
    mockedGetSession,
    mockedSetSession,
    getFirstStepCorrectFields,
    getFirstStepWrongFields,
    getResolvers,
    getStepper,
  }
}
