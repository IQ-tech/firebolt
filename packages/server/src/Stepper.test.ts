import faker from "faker"
import Stepper from "./Stepper"
import { IExperienceJSONSchema } from "./types"
import {
  IEngineResolvers,
  IExperienceProceedPayload,
  IFireboltSession,
} from "./interfaces/IEngine"

import JSONSample from "./mocks/sample-experience"
import {
  oneStepCompletedFlowDefault,
  twoStepsCompletedFlowDefault,
} from "./mocks/sample-experience-session"

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

describe("Stepper.start handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test.todo("should return a error when schema is not found")
  test.todo("should return a error when schema dont have default flow")

  test("should start a new experience", async () => {
    const sample = JSONSample
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: sample,
      resolvers,
    })

    const firstStep = await fireboltStepper.start()

    expect(firstStep.sessionId).toBe("")
    expect(firstStep.step.slug).toBe("personal_data")
    expect(firstStep.capturedData).toEqual({})
    expect(firstStep.experienceMetadata.currentPosition).toBe(1)
  })

  test("should identify an started experience and return the correct step", async () => {
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: JSONSample,
      resolvers,
    })

    const nextStep = await fireboltStepper.start({
      sessionId: twoStepsCompletedFlowDefault.sessionId,
    })

    expect(nextStep.step.slug).toBe("address")
    expect(nextStep.experienceMetadata.currentPosition).toBe(3)
    expect(nextStep.capturedData).toEqual(twoStepsCompletedFlowDefault.steps)
  })
})

describe("Stepper.proceed handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })
  test("should validate the step fields and return an error", async () => {
    const sample = JSONSample
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: sample,
      resolvers,
    })
    const firstStepField = {
      full_name: "Teste",
      email: "teste@",
    }
    const sessionId = faker.datatype.uuid()
    const payload: IExperienceProceedPayload = {
      sessionId,
      fields: firstStepField,
    }
    const proceed = await fireboltStepper.proceed(payload)

    expect(proceed.errors?.isValid).toBe(false)
    expect(proceed.errors?.invalidFields.length).not.toBe(0)
    expect(proceed.step.slug).toBe("personal_data")
  })

  test("should validate the first step fields and return the second step info", async () => {
    const sample = JSONSample
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: sample,
      resolvers,
    })

    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const email = faker.internet.email()
    const firstStepField = {
      full_name: name,
      email: email,
    }

    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const proceed = await fireboltStepper.proceed(payload)
    expect(proceed.errors).toEqual({})
    expect(proceed.step.slug).toBe("documents")
    expect(proceed.capturedData.personal_data.fields).toEqual(firstStepField)
    expect(proceed.experienceMetadata.currentPosition).toBe(2)
  })

  test("should identify the current step, validate and return the next step info", async () => {
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(oneStepCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: JSONSample,
      resolvers,
    })

    const payload = {
      brazil_id_number: "1234567890",
    }

    const proceed = await fireboltStepper.proceed({
      sessionId: oneStepCompletedFlowDefault.sessionId,
      fields: payload,
    })

    const expectedCaptureData = {
      ...oneStepCompletedFlowDefault.steps,
      documents: { fields: { ...payload } },
    }

    expect(proceed.sessionId).toBe(oneStepCompletedFlowDefault.sessionId)
    expect(proceed.capturedData).toEqual(expectedCaptureData)
    expect(proceed.step.slug).toBe("address")
  })

  test("should revalidate a previously filled step and return a error (changes made on fields)", async () => {
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: JSONSample,
      resolvers,
    })

    const firstStepField = {
      full_name: "Teste",
      email: "teste@",
    }
    const payload: IExperienceProceedPayload = {
      sessionId: twoStepsCompletedFlowDefault.sessionId,
      fields: firstStepField,
    }

    // goBack simulate
    const currentSession = (await mockedGetSession(
      twoStepsCompletedFlowDefault.sessionId
    )) as IFireboltSession

    const goBackTwoStepsSession: IFireboltSession = {
      ...currentSession,
      experienceState: {
        ...currentSession.experienceState,
        visualizingStepSlug: "personal_data",
      },
    }

    mockedSetSession(goBackTwoStepsSession)

    const proceed = await fireboltStepper.proceed(payload)

    expect(proceed.errors?.isValid).toBe(false)
    expect(proceed.errors?.invalidFields.length).not.toBe(0)
    expect(proceed.step.slug).toBe("personal_data")
  })

  test("should revalidate a previously filled step (changes made on fields)", async () => {
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: JSONSample,
      resolvers,
    })

    const name = `John Doe`
    const email = faker.internet.email()

    const firstStepField = {
      full_name: name,
      email,
    }
    const payload: IExperienceProceedPayload = {
      sessionId: twoStepsCompletedFlowDefault.sessionId,
      fields: firstStepField,
    }

    // goBack simulate
    const currentSession = (await mockedGetSession(
      twoStepsCompletedFlowDefault.sessionId
    )) as IFireboltSession

    const goBackTwoStepsSession: IFireboltSession = {
      ...currentSession,
      experienceState: {
        ...currentSession.experienceState,
        visualizingStepSlug: "personal_data",
      },
    }

    mockedSetSession(goBackTwoStepsSession)

    const proceed = await fireboltStepper.proceed(payload)

    expect(proceed.errors).toEqual({})
    expect(proceed.step.slug).toBe("documents")
    expect(proceed.capturedData.personal_data.fields).toEqual(firstStepField)
    expect(proceed.experienceMetadata.currentPosition).toBe(2)
  })

  test.todo(
    "shouldn't validate a previously filled step (no changes made on fields)"
  )
  test.todo("shouldn't validate custom step progression")
  test.todo("first transition should return a brand new session id")
})

describe("Stepper.goBack handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should go back to previous step", async () => {
    const resolvers: IEngineResolvers = {
      getExperienceJSON: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONConfig: JSONSample,
      resolvers,
    })

    const previousStep = await fireboltStepper.goBackHandler({
      sessionId: twoStepsCompletedFlowDefault.sessionId,
    })

    expect(previousStep.step.slug).toBe("documents")
    expect(previousStep.experienceMetadata.currentPosition).toBe(2)
    expect(previousStep.errors).toEqual({})
  })
})

describe("Props presets apply", () => {
  test.todo("props presets should be applied on Engine.start return value")

  test.todo("props presets should be applied on Engine.proceed return value")

  test.todo("props presets should be applied on Engine.goBack return value")

  test.todo("props presets should be applied on Engine.debug return value")
})

describe("Stepper hooks working", () => {})
