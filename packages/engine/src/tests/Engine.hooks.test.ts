import faker from "faker"
import Engine from "../index"

import { IExperienceConfig } from "@iq-firebolt/entities"
import { IExperienceProceedPayload } from "../types"

import JSONSample from "../mocks/sample-experience"
import useMockNavigation from "../mocks/mock-navigation"

const {
  localStorage,
  getFirstStepCorrectFields,
  getFirstStepWrongFields,
  getResolvers,
} = useMockNavigation()

// //#region MOCKS

const getStepper = ({
  experienceJSONConfig = JSONSample,
  action,
  onStart,
  onEnd,
}: {
  experienceJSONConfig?: IExperienceConfig
  action: string
  onStart: () => void
  onEnd: () => void
}) => {
  const mockedOnStartStepHook = ({ operation }) => {
    if (operation === action) onStart()
  }
  const mockedOnEndStepHook = ({ operation }) => {
    if (operation === action) onEnd()
  }

  return new Engine({
    experienceId: "sample",
    experienceJSONConfig,
    resolvers: getResolvers(),
    hooks: {
      onStartStepTransition: mockedOnStartStepHook,
      onEndStepTransition: mockedOnEndStepHook,
    },
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
    const fireboltStepper = getStepper({
      action: "start",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
    await fireboltStepper.start()
    expect(mockedStart).toBeCalledTimes(1)
  })

  test("should run onEndStepTransition on start method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getStepper({
      action: "start",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
    await fireboltStepper.start()
    expect(mockedEnd).toBeCalledTimes(1)
  })

  test("should run onEndStepTransition error on start method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getStepper({
      experienceJSONConfig: {} as IExperienceConfig,
      action: "error",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
    await fireboltStepper.start()
    expect(mockedEnd).toBeCalledTimes(1)
  })

  test("should run onStartStepTransition on proceed method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getStepper({
      action: "proceed",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
    const firstStepField = getFirstStepCorrectFields()
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
    const fireboltStepper = getStepper({
      action: "proceed",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
    const firstStepField = getFirstStepCorrectFields()
    const sessionId = faker.datatype.uuid()
    const payload: IExperienceProceedPayload = {
      sessionId,
      fields: firstStepField,
    }
    await fireboltStepper.proceed(payload)
    expect(mockedEnd).toBeCalledTimes(1)
  })

  test("should run onEndStepTransition on error method", async () => {
    const mockedStart = jest.fn(() => {})
    const mockedEnd = jest.fn(() => {})
    const fireboltStepper = getStepper({
      action: "error",
      onStart: mockedStart,
      onEnd: mockedEnd,
    })
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
