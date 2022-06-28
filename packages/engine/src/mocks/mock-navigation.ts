import faker from "faker"
import Engine from "../index"
import {
  IExperienceJSONSchema,
  IStepFormPayload,
  IDecisionHandlerConfig,
} from "../types"
import {
  IEngineResolvers,
  IExperienceDecision,
  IExperienceDecisionCallbackFunction,
  IExperienceDecisionOptions,
  IExperienceDecisionPayload,
  IFireboltSession,
} from "../interfaces/IEngine"
import JSONSample from "../mocks/sample-experience"
import mockWithDecisionConfig from "../mocks/sample-with-decision-config"
import fs from "fs"

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

  const getStepper = (
    withDecision: boolean = false,
    {
      strategy,
      saveProcessedData,
      triggers,
      remoteConfig,
    }: IDecisionHandlerConfig = {
      strategy: "local",
      saveProcessedData: "all",
      triggers: "all",
    }
  ) => {
    const sample = withDecision
      ? mockWithDecisionConfig({
          strategy,
          saveProcessedData,
          triggers,
          remoteConfig,
        })
      : JSONSample

    return new Engine({
      experienceId: "sample",
      experienceJSONConfig: sample,
      resolvers: getResolvers(),
    })
  }

  const getProceedDecision = (option: IExperienceDecisionOptions = {}) => {
    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      decide("proceed", option || { processedData: payload.receivingStepData })
    }
    return callbackFunction
  }

  const getChangeFlowDecision = (
    option: IExperienceDecisionOptions = { newFlow: "medium" }
  ) => {
    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      decide("changeFlow", option)
    }
    return callbackFunction
  }

  const getBlockProgressionDecision = (
    option: IExperienceDecisionOptions = {}
  ) => {
    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      decide("blockProgression", option || { errors: "some decision error" })
    }

    return callbackFunction
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
    getProceedDecision,
    getChangeFlowDecision,
    getBlockProgressionDecision,
  }
}
