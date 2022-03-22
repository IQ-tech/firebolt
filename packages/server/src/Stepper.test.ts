import { IEngineResolvers, IStepConfig, IFireboltStepData } from "./types"

import faker from "faker"

import JSONSample from "./json-sample.json"
import stepper from "./Stepper"
const localStorage = global.localStorage

describe("start stepper engine", () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test("Engine.start should generate a new token and return the first step", async () => {
    const mockedGetSession = jest.fn(async () => undefined)
    const mockedGetFormJSONSchema = jest.fn(() => ({} as Promise<IStepConfig>))
    const mockedSetSession = jest.fn(async () => {})

    const engine = new stepper({
      slug: "sample",
      formJSONSchema: JSONSample,
      resolvers: {
        getFormJSONSchema: mockedGetFormJSONSchema,
        getSession: mockedGetSession,
        setSession: mockedSetSession,
      },
    })

    const form = await engine.startHandler()

    expect(mockedGetSession).toBeCalled()
    expect(form.sessionId).not.toBeUndefined()
    expect(form.step.position).toBe(1)
    expect(form.step.data.slug).toBe("personal_data")
  })

  test.todo(
    "Engine.start should use an existing token and retrieve the last uncompleted step"
  )
})

describe("next step handling", () => {
  test.todo("Engine.proceed should succesfully validate the step fields")

  test.todo(
    "Engine.proceed should validate the step fields and return an error"
  )
})

describe("Props presets apply", () => {
  test.todo("props presets should be applied on Engine.start return value")

  test.todo("props presets should be applied on Engine.proceed return value")

  test.todo("props presets should be applied on Engine.goBack return value")

  test.todo("props presets should be applied on Engine.debug return value")
})

describe("Stepper hooks working", () => {})
