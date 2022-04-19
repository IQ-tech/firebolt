import Engine from "./Engine"
import { IFireboltSession } from "./interfaces/IEngine"
import { IExperienceJSONSchema } from "./mocks/sample-experience"
import JSONSample from "./mocks/sample-experience"
import { twoStepsCompletedFlowDefault } from "./mocks/sample-experience-session"
import {
  sampleWithoutDefaultFlow,
  defaultFlowWithoutSteps,
  experienceWithoutSteps,
} from "./mocks/invalid/sample-without-default-flow"

const localStorage = global.localStorage

describe("should identify JSON Errors", () => {
  test("should return an error when no way to get JSON Config is provided", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("noWayToFindJSONConfig")
  })

  test("should return an error when JSON config is not found", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
        getExperienceJSON: async () => null as unknown as IExperienceJSONSchema,
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("JSONNotFound")
  })

  test("should return an error when JSON config dont have default flow", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: sampleWithoutDefaultFlow,
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()

    expect(receivedStep?.error?.id).toBe("JSONWithoutDefaultFlow")
  })

  test("should return an error when flow does not have steps", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: experienceWithoutSteps,
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()
    expect(receivedStep?.error?.id).toBe("stepListNotProvided")
  })

  test("should return an error when JSON config does not have steps", async () => {
    const engine = new Engine({
      experienceId: "asd",
      experienceJSONConfig: { ...defaultFlowWithoutSteps },
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const receivedStep = await engine.start()
    expect(receivedStep?.error?.id).toBe("flowWithoutSteps")
  })
  test.todo("should return an error when flow does not exists on JSON config")
  test.todo("should return an error when step does not exists on JSON Config")
})

describe("should identify resolver errors", () => {
  test("should return an error when getSession resolver is missing", async () => {
    const engine = new Engine({
      experienceId: "asd",
      /** @ts-ignore */
      resolvers: {
        setSession: async () => {},
        getExperienceJSON: async () => null as unknown as IExperienceJSONSchema,
      },
    })

    const start = await engine.start()
    expect(start?.error?.id).toBe("resolverMissing")
  })

  test("should return an error when getSession resolves wrong data", async () => {
    localStorage.setItem(
      twoStepsCompletedFlowDefault.sessionId,
      JSON.stringify(twoStepsCompletedFlowDefault)
    )
    const engine = new Engine({
      experienceId: twoStepsCompletedFlowDefault.sessionId,
      experienceJSONConfig: JSONSample,
      resolvers: {
        getSession: async () => {
          /** @ts-ignore */
          return {
            teste: "erro",
          } as IFireboltSession
        },
        setSession: async () => {},
      },
    })

    const proceedingStep = await engine.proceed()
    console.log(proceedingStep)

    expect(proceedingStep?.error?.id).toBe("resolverReturnIsInvalid")
  })

  test("should return an error when setSession resolver is missing", async () => {
    const engine = new Engine({
      experienceId: "asd",
      /** @ts-ignore */
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        getExperienceJSON: async () => null as unknown as IExperienceJSONSchema,
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("resolverMissing")
  })
})

describe("should identify addons errors", () => {
  test.todo("should return an error when invalid addon is provided")
})

describe("should identify generic errors", () => {
  test.todo("should identify error ocurred inside resolver")
})
