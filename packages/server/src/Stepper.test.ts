import faker from "faker"
import Stepper from "./Stepper"
import { IExperienceJSONSchema } from "./types"
import {
  IEngineResolvers,
  IExperienceProceedPayload,
  IFireboltSession,
} from "./interfaces/IEngine"

import JSONSample from "./mocks/sample-experience"
import { twoStepsCompletedFlowDefault } from "./mocks/sample-experience-session"

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
      getFormJSONSchema: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONSchema: sample,
      resolvers,
    })

    const firstStep = await fireboltStepper.start()

    expect(firstStep.sessionId).toBe("")
    expect(firstStep.step.slug).toBe("personal_data")
    expect(firstStep.capturedData).toEqual({})
  })

  test("should identify an started experience and return the correct step", async () => {
    const resolvers: IEngineResolvers = {
      getFormJSONSchema: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONSchema: JSONSample,
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
      getFormJSONSchema: mockedGetFormJSONSchema,
      getSession: mockedGetSession,
      setSession: mockedSetSession,
    }
    const fireboltStepper = new Stepper({
      experienceId: "sample",
      experienceJSONSchema: sample,
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
  })

  test("should validate the first step fields and return the second step info", async () => {
    const sample = JSONSample
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
    expect(proceed.capturedData.personal_data).toEqual(firstStepField)
  })
  test.todo(
    "should be able to identify the current step, validate and return the next step info"
  )
  // test("should be able to update previous steps without data loss", async () => {
  //   const resolvers: IEngineResolvers = {
  //     getFormJSONSchema: mockedGetFormJSONSchema,
  //     getSession: mockedGetSession,
  //     setSession: mockedSetSession,
  //   }
  //   mockedSetSession(twoStepsCompletedFlowDefault)
  //   const fireboltStepper = new Stepper({
  //     experienceId: "sample",
  //     experienceJSONSchema: JSONSample,
  //     resolvers,
  //   })
  //   await fireboltStepper.goBackHandler({
  //     sessionId: twoStepsCompletedFlowDefault.sessionId,
  //   })
  //   await fireboltStepper.goBackHandler({
  //     sessionId: twoStepsCompletedFlowDefault.sessionId,
  //   })
  //   const firstStepField = {
  //     full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //     email: faker.internet.email(),
  //   }
  //   const firstStepUpdate = await fireboltStepper.proceed({
  //     sessionId: twoStepsCompletedFlowDefault.sessionId,
  //     fields: firstStepField,
  //   })
  //   // console.log("firstStepUpdate: ", firstStepUpdate.step)
  //   expect(firstStepUpdate.capturedData.documents).toEqual(
  //     twoStepsCompletedFlowDefault.steps.documents
  //   )
  //   expect(firstStepUpdate.capturedData.personal_data).toEqual(firstStepField)
  //   expect(firstStepUpdate.experienceMetadata.currentPosition).toBe(2)
  // })
})

// describe("Stepper.goBack handling", () => {
//   beforeEach(() => {
//     localStorage.clear()
//     jest.clearAllMocks()
//   })

//   test("should go back to previous step", async () => {
//     const resolvers: IEngineResolvers = {
//       getFormJSONSchema: mockedGetFormJSONSchema,
//       getSession: mockedGetSession,
//       setSession: mockedSetSession,
//     }

//     mockedSetSession(twoStepsCompletedFlowDefault)
//     const fireboltStepper = new Stepper({
//       experienceId: "sample",
//       experienceJSONSchema: JSONSample,
//       resolvers,
//     })

//     const previousStep = await fireboltStepper.goBackHandler({
//       sessionId: twoStepsCompletedFlowDefault.sessionId,
//     })

//     expect(previousStep.step.slug).toBe("documents")
//     expect(previousStep.experienceMetadata.currentPosition).toBe(2)
//     expect(previousStep.experienceMetadata.lastCompletedStepSlug).toBe(
//       "documents"
//     )
//     expect(previousStep.capturedData).toEqual(
//       twoStepsCompletedFlowDefault.steps
//     )
//   })
// })

describe("Props presets apply", () => {
  test.todo("props presets should be applied on Engine.start return value")

  test.todo("props presets should be applied on Engine.proceed return value")

  test.todo("props presets should be applied on Engine.goBack return value")

  test.todo("props presets should be applied on Engine.debug return value")
})

describe("Stepper hooks working", () => {})
