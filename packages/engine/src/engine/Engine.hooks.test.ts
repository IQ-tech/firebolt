import faker from "faker"
import Engine from "./index"

import { IExperienceJSONSchema, IStepFormPayload } from "../types"
import {
  IEngineResolvers,
  IFireboltSession,
  IExperienceProceedPayload
} from "../interfaces/IEngine"


import JSONSample from "../mocks/sample-experience"

//#region MOCKS
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

const getSteper = ({action, onStart, onEnd}: {action: string, onStart: () => void, onEnd: () => void}) => {
  const mockedOnStartStepHook = ({ operation }) => {
    if(operation === action) onStart()
  }
  const mockedOnEndStepHook = ({ operation }) => {
    if(operation === action) onEnd()
  }

  return new Engine({
    experienceId: 'sample',
    experienceJSONConfig: JSONSample,
    resolvers: getResolvers(),
    hooks: {
      onStartStepTransition: mockedOnStartStepHook,
      onEndStepTransition: mockedOnEndStepHook
    }
  })
}

//#endregion

describe("Engine hooks working", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should run onStartStepTransition on start method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getSteper({action: 'start', onStart: mockedStart, onEnd: mockedEnd})
    await fireboltStepper.start()
    expect(mockedStart).toBeCalledTimes(1)
  })

  test("should run onEndStepTransition on start method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getSteper({action: 'start', onStart: mockedStart, onEnd: mockedEnd})
    await fireboltStepper.start()
    expect(mockedEnd).toBeCalledTimes(1)
  })

  test("should run onStartStepTransition on proceed method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getSteper({action: 'proceed', onStart: mockedStart, onEnd: mockedEnd})
    const firstStepField = getFirstStepWrongFields()
    const sessionId = faker.datatype.uuid()
    const payload: IExperienceProceedPayload = {
      sessionId,
      fields: firstStepField,
    }
    await fireboltStepper.proceed(payload)
    expect(mockedStart).toBeCalledTimes(1)
  })

  test("should run onEndStepTransition on proceed method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getSteper({action: 'proceed', onStart: mockedStart, onEnd: mockedEnd})
    const firstStepField = getFirstStepWrongFields()
    const sessionId = faker.datatype.uuid()
    const payload: IExperienceProceedPayload = {
      sessionId,
      fields: firstStepField,
    }
    await fireboltStepper.proceed(payload)
    expect(mockedEnd).toBeCalledTimes(1)
  })

})
