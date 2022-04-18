import Engine from "./Engine"
import { IFireboltSession } from "./interfaces/IEngine"

describe("should identify JSON Errors", () => {
  test("should return an error when JSON config is not found", async () => {
    const engine = new Engine({
      experienceId: "asd",
      resolvers: {
        getSession: async () => ({} as IFireboltSession),
        setSession: async () => {},
      },
    })

    const proceedingStep = await engine.start()
    expect(proceedingStep?.error?.id).toBe("JSONNotFound")
  })
  test.todo("should return an error when JSON config dont have default flow")
  test.todo("should return an error when flow does not exists on JSON config")
  test.todo("should return an error when there's no way to get a JSON config")
  test.todo("should return an error when step does not exists on JSON Config")
})

describe("should identify resolver errors", () => {
  test.todo("should return an error when getSession resolver is missing")
  test.todo("should return an error when getSession resolves wrong data")
  test.todo("should return an error when setSession resolver is missing")
})

describe("should identify addons errors", () => {
  test.todo("should return an error when invalid addon is provided")
})

describe("should identify generic errors", () => {
  test.todo("should identify error ocurred inside resolver")
})
