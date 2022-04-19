import faker from "faker"
import Engine from "./Engine"
import * as validation from "./helpers/validateStep"

import { IExperienceJSONSchema, IStepFormPayload } from "./types"
import {
  IEngineResolvers,
  IExperienceDecisionCallbackFunction,
  IExperienceProceedPayload,
  IFireboltSession,
} from "./interfaces/IEngine"

import JSONSample from "./mocks/sample-experience"
import {
  oneStepCompletedFlowDefault,
  twoStepsCompletedFlowDefault,
} from "./mocks/sample-experience-session"

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

const getStepper = () => {
  return new Engine({
    experienceId: "sample",
    experienceJSONConfig: JSONSample,
    resolvers: getResolvers(),
  })
}
//#endregion

describe("Engine.start handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should start a new experience", async () => {
    const fireboltStepper = getStepper()
    const firstStep = await fireboltStepper.start()

    expect(firstStep?.sessionId).toBe("")
    expect(firstStep?.step?.slug).toBe("personal_data")
    expect(firstStep?.capturedData).toEqual({})
    expect(firstStep?.experienceMetadata?.currentPosition).toBe(1)
  })

  test("should identify an started experience and return the correct step", async () => {
    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = getStepper()

    const nextStep = await fireboltStepper.start({
      sessionId: twoStepsCompletedFlowDefault.sessionId,
    })

    expect(nextStep?.step?.slug).toBe("address")
    expect(nextStep?.experienceMetadata?.currentPosition).toBe(3)
    expect(nextStep?.capturedData).toEqual(twoStepsCompletedFlowDefault.steps)
  })
})

describe("Engine.proceed handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should validate the step fields and return an error", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepWrongFields()
    const sessionId = faker.datatype.uuid()
    const payload: IExperienceProceedPayload = {
      sessionId,
      fields: firstStepField,
    }
    const proceed = await fireboltStepper.proceed(payload)
    expect(proceed).toHaveProperty("error")
    expect(proceed?.error?.invalidFields?.length).not.toBe(0)
    expect(proceed?.error?.id).toBe("fieldValidation")
    expect(proceed?.step?.slug).toBe("personal_data")
    expect(validationStepSpy).toBeCalled()
  })

  test("should validate the first transition fields and return the second step info", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const proceed = await fireboltStepper.proceed(payload)

    expect(typeof proceed?.sessionId).toBe("string")
    expect(proceed?.error).toEqual(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
    expect(validationStepSpy).toBeCalled()
  })

  test("should identify the current step, validate and return the next step info", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")

    mockedSetSession(oneStepCompletedFlowDefault)
    const fireboltStepper = getStepper()

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

    expect(proceed?.sessionId).toBe(oneStepCompletedFlowDefault.sessionId)
    expect(proceed?.capturedData).toEqual(expectedCaptureData)
    expect(proceed?.step?.slug).toBe("address")
    expect(proceed?.error).toEqual(null)
    expect(validationStepSpy).toBeCalled()
  })

  test("should revalidate a previously filled step and return a error (changes made on fields)", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepWrongFields()
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

    /* expect(proceed.error?.isValid).toBe(false) */
    expect(proceed?.error?.invalidFields?.length).not.toBe(0)
    expect(proceed?.step?.slug).toBe("personal_data")
    expect(validationStepSpy).toBeCalled()
  })

  test("should revalidate a previously filled step (changes made on fields)", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
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

    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
    expect(validationStepSpy).toBeCalled()
  })

  test("shouldn't validate a previously filled step (no changes made on fields)", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = getStepper()

    const firstStepField = {
      ...twoStepsCompletedFlowDefault.steps.personal_data.fields,
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

    expect(validationStepSpy).not.toBeCalled()
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data?.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
  })

  test.todo("shouldn't validate custom step progression")

  test("should handle with changeFlow decision", async () => {
    const fireboltStepper = getStepper()
    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }
    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      if (payload.receivingStepData?.fields?.email) {
        decide("changeFlow", { newFlow: "medium" })
      }
    }
    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.capturedData?.personal_data?.fields).toEqual(firstStepField)
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
    expect(proceed?.experienceMetadata?.stepsList?.length).toBe(3)
    expect(proceed?.experienceMetadata?.lastStepSlug).toBe("token")
  })

  test("should handle with blockProgression decision", async () => {
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const mockedErrors = {
      email: "user already exists",
    }

    const callbackFunction: IExperienceDecisionCallbackFunction = (
      decide,
      payload
    ) => {
      if (payload.receivingStepData?.fields?.email) {
        decide("blockProgression", { errors: mockedErrors })
      }
      decide("changeFlow", { newFlow: "medium" })
    }

    const proceed = await fireboltStepper.proceed(payload, callbackFunction)

    expect(proceed?.error?.id).toBe("blockProgressionDecision")
    expect(proceed?.step?.slug).toBe("personal_data")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(1)
  })

  test("should handle with proceed decision", async () => {
    const fireboltStepper = getStepper()

    const firstStepFields = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepFields,
    }

    const proceed = await fireboltStepper.proceed(payload)

    expect(proceed?.sessionId.length > 0).toBe(true)
    expect(proceed?.error).toBe(null)
    expect(proceed?.step?.slug).toBe("documents")
    expect(proceed?.experienceMetadata?.currentPosition).toBe(2)
  })
})

describe("Engine.goBack handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should go back to previous step", async () => {
    mockedSetSession(twoStepsCompletedFlowDefault)
    const fireboltStepper = getStepper()

    const previousStep = await fireboltStepper.goBackHandler({
      sessionId: twoStepsCompletedFlowDefault.sessionId,
    })

    expect(previousStep?.step?.slug).toBe("documents")
    expect(previousStep?.experienceMetadata?.currentPosition).toBe(2)
    expect(previousStep?.error).toBe(null)
  })

  test("should returns the same step if there is no previous one", async () => {
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      fields: firstStepField,
    }

    const previousStep = await fireboltStepper.goBackHandler(payload)

    expect(previousStep?.step?.slug).toBe("personal_data")
    expect(previousStep?.experienceMetadata?.currentPosition).toBe(1)
  })
})
