import { IFireboltSession } from "@iq-firebolt/entities"
import { payloadFactory, sessionFactory } from "@iq-firebolt/mocks"
import * as validation from "../helpers/validateStep"

import { IExperienceProceedPayload } from "../types"

import useMockNavigation from "../mocks/mock-navigation"

const {
  localStorage,
  mockedGetSession,
  mockedSetSession,
  getFirstStepCorrectFields,
  getFirstStepWrongFields,
  getStepper,
} = useMockNavigation()

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
    const mockedSession = sessionFactory("defaultTwoStepsCompleted")
    mockedSetSession(mockedSession)
    const fireboltStepper = getStepper()

    const nextStep = await fireboltStepper.start({
      sessionId: mockedSession.sessionId,
    })

    expect(nextStep?.step?.slug).toBe("address")
    expect(nextStep?.experienceMetadata?.currentPosition).toBe(3)
    expect(nextStep?.capturedData).toEqual(mockedSession.steps)
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

    const sessionId = "asdf-1234-asdf-1234"
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
    const mockedSession = sessionFactory("defaultOneStepCompleted")
    mockedSetSession(mockedSession)
    const fireboltStepper = getStepper()

    const payload = {
      brazil_id_number: "1234567890",
    }

    const proceed = await fireboltStepper.proceed({
      sessionId: mockedSession.sessionId,
      fields: payload,
    })

    const expectedCaptureData = {
      ...mockedSession.steps,
      documents: { fields: { ...payload } },
    }

    expect(proceed?.sessionId).toBe(mockedSession.sessionId)
    expect(proceed?.capturedData).toEqual(expectedCaptureData)
    expect(proceed?.step?.slug).toBe("address") //documents
    expect(proceed?.error).toEqual(null)
    expect(validationStepSpy).toBeCalled()
  })

  test("should revalidate a previously filled step and return a error (changes made on fields)", async () => {
    const validationStepSpy = jest.spyOn(validation, "default")
    const mockedSession = sessionFactory("defaultTwoStepsCompleted")
    mockedSetSession(mockedSession)
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepWrongFields()
    const payload: IExperienceProceedPayload = {
      sessionId: mockedSession.sessionId,
      fields: firstStepField,
    }

    // goBack simulate
    const currentSession = (await mockedGetSession(
      mockedSession.sessionId
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
    const mockedSession = sessionFactory("defaultTwoStepsCompleted")
    mockedSetSession(mockedSession)
    const fireboltStepper = getStepper()

    const firstStepField = getFirstStepCorrectFields()
    const payload: IExperienceProceedPayload = {
      sessionId: mockedSession.sessionId,
      fields: firstStepField,
    }

    // goBack simulate
    const currentSession = (await mockedGetSession(
      mockedSession.sessionId
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
    const mockedSession = sessionFactory("defaultTwoStepsCompleted")
    mockedSetSession(mockedSession)
    const fireboltStepper = getStepper()

    const firstStepField = {
      ...mockedSession.steps.personal_data.fields,
    }
    const payload: IExperienceProceedPayload = {
      sessionId: mockedSession.sessionId,
      fields: firstStepField,
    }

    // goBack simulate
    const currentSession = (await mockedGetSession(
      mockedSession.sessionId
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
})

describe("Engine.goBack handling", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should go back to previous step", async () => {
    const mockedGetSession = sessionFactory("defaultTwoStepsCompleted")
    mockedSetSession(mockedGetSession)
    const fireboltStepper = getStepper()

    const previousStep = await fireboltStepper.goBackHandler({
      sessionId: mockedGetSession.sessionId,
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
