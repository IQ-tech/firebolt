import axios from "axios"

import FireboltFormEngine from "./FireboltFormEngine"

import { clearAllFormSessions } from "./helpers/session/clearFormSession"
import getFireboltLocalStorage from "./helpers/session/getFireboltLocalStorage"
import createFormSession from "./helpers/session/createFormSession"

import startFormResponse from "./__mocks__/startFormResponse"
import nextStepFormResponse from "./__mocks__/nextStepFormResponse"
import * as presetsMock from "./__mocks__/props-presets-steps"

jest.mock("axios")

const formName = "partnerFormPotato"

const form = new FireboltFormEngine({
  root: "https://my-firebolt-api/",
  formName,
}, {
  addons: {
    uiPropsPresets: [
      presetsMock.customCollection,
      presetsMock.secondCollection
    ]
  }
})

describe("start form tests", () => {
  beforeEach(() => {
    clearAllFormSessions()
  })

  test("start form correctly creates session key on localStorage", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: startFormResponse })

    // get first step
    await form.start()

    // storage test
    const fireboltLocalStorage = getFireboltLocalStorage()
    const keys = fireboltLocalStorage?.sessionKeys || {}
    const currentFormSession = keys?.[formName]

    expect(currentFormSession).toBeTruthy()
    expect(currentFormSession).toBe(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI2NzkyMTQ0MC01ZDljLTQwMmUtYTI4Yi0wZjJkOGRkNjRiZjYiLCJpYXQiOjE2MzU4NzI4NTV9.7y5GR8_1acwQ5UdttHJK0_LIoMze4COpcwy6bs4ovH4"
    )
  })

  test("start form uses session key already created on localstorage", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: nextStepFormResponse })

    const formAccess = {
      root: "https://another-firebolt-api/",
      formName: "myCustomForm",
    }
    createFormSession(formAccess.formName, "myPreviousSessionAuthKey")

    const form = new FireboltFormEngine(formAccess)
    await form.start()

    expect((axios.get as jest.Mock)).lastCalledWith(
      "https://another-firebolt-api/form/myCustomForm",
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer myPreviousSessionAuthKey",
        }),
      })
    )
  })

  test.todo("throw an error when providing invalid api access")

  test.todo("throw an error on try to debug a step without debug key")
})

describe("tests about the form autofill by base64 at URL", () => {
  const autoFillBase64 =
    "autofill=JTdCJTI3bmFtZSUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3UnVhbiUyMEJlcnQlQzMlQTklMjclMkMlMjdtYXNrJTI3JTNBJTI3JTI3JTdEJTJDJTI3Y3BmJTI3JTNBJTdCJTI3dmFsdWUlMjclM0ElMjc0NTAuNTkyLjczOC01NyUyNyUyQyUyN21hc2slMjclM0ElMjdjcGYlMjclN0QlMkMlMjdlbWFpbCUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3YmVydGUucnVhbiU0MGdtYWlsLmNvbSUyNyUyQyUyN21hc2slMjclM0ElMjclMjclN0QlMkMlMjdpbmNvbWUlMjclM0ElN0IlMjd2YWx1ZSUyNyUzQSUyNzYwMDAlMjclMkMlMjdtYXNrJTI3JTNBJTI3bW9uZXklMjclN0QlMkMlMjdwaG9uZSUyNyUzQSU3QiUyN3ZhbHVlJTI3JTNBJTI3NDI5OTk4ODM3NjglMjclMkMlMjdtYXNrJTI3JTNBJTI3cGhvbmVfbnVtYmVyJTI3JTdEJTdE"
  
  test("form.start() must autofill value prop of the field email at the fields array", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: startFormResponse })

    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        search: autoFillBase64,
        href: autoFillBase64,
      },
    })

    const formStartResult = await form.start()
    expect(formStartResult.step.data.fields[1]).toHaveProperty("value")
    expect(formStartResult.step.data.fields[1].value).toBe(
      "berte.ruan@gmail.com"
    )
  })
})

describe("testing props:preset", () => {
  beforeEach(() => {
    clearAllFormSessions()
  })

  test("form.start() should apply props:preset without collection", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: presetsMock.getRequestMock("bat") })
    const formStartResult = await form.start()
    expect(formStartResult?.step?.data?.fields[0]?.["ui:props"].cenoura).toBe("cenoura")
  })

  test("form.start() should apply props:preset with collection", async() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: presetsMock.getRequestMock("cod:second-preset-collection") })
    const formStartResult = await form.start()
    expect(formStartResult?.step?.data?.fields[0]?.["ui:props"].cebola).toBe("cebola")
  })

  test("form.start() should overwrite props:preset", async() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: presetsMock.getRequestMock("bat") })
    const formStartResult = await form.start()
    expect(formStartResult?.step?.data?.fields[0]?.["ui:props"].cenoura).toBe("cenoura")
    expect(formStartResult?.step?.data?.fields[0]?.["ui:props"].label).toBe("Nome completo")
  })

})


