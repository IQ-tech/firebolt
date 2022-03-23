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

  test("Engine.start should use an existing token and retrieve the last uncompleted step", async () => {
    const mockedGetSession = jest.fn(async (sessionId?: string) => {
      const session = localStorage.getItem(sessionId)
      return JSON.parse(session) as IFireboltStepData
    })
    const mockedGetFormJSONSchema = jest.fn(() => ({} as Promise<IStepConfig>))
    const mockedSetSession = jest.fn(async () => {})
    const sessionId = faker.datatype.uuid()

    const engine = new stepper({
      slug: "sample",
      sessionId,
      formJSONSchema: JSONSample,
      resolvers: {
        getFormJSONSchema: mockedGetFormJSONSchema,
        getSession: mockedGetSession,
        setSession: mockedSetSession,
      },
    })

    const mockedFirstStep = {
      sessionId,
      step: {
        position: 2,
        data: {
          id: 2,
          slug: "documents",
          type: "form",
          friendlyname: "Documentos",
          fields: [
            {
              slug: "brazil_id_number",
              "ui:widget": "Text",
              "ui:props": {
                label: "Número do documento",
              },
              validators: [{ "type": "required" }],
              meta: {},
            },
          ],
        },
        webhookResult: {
          preventContinue: false,
          errorSlugField: "",
          errorMessage: "",
        },
      },
      meta: {
        lastStep: "bills",
        forms: [
          {
            position: 1,
            slug: "personal_data",
            friendlyname: "Vamos começar",
          },
          {
            position: 2,
            slug: "documents",
            friendlyname: "Documentos",
          },
          {
            position: 3,
            slug: "address",
            friendlyname: "Endereço",
          },
          {
            position: 4,
            slug: "bills",
            friendlyname: "Adicionar Contas",
          },
        ],
      },
      capturedData: {
        updatedAt: 1648042931078,
        business: "sample",
        partner: "sample",
        full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      },
    } as IFireboltStepData

    localStorage.setItem(sessionId, JSON.stringify(mockedFirstStep))

    const form = await engine.startHandler()
    expect(form).toEqual(mockedFirstStep)
    // expect(form.sessionId).toBe(sessionId)
    // expect(form.step.position).toBe(2)
    // expect(form.step.data.slug).toBe("documents")
  })
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
