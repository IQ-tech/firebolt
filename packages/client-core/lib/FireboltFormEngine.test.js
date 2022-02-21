import axios from "axios"

import FireboltFormEngine from "./FireboltFormEngine"

import { clearAllFormSessions } from "./helpers/session/clearFormSession"
import getFireboltLocalStorage from "./helpers/session/getFireboltLocalStorage"
import createFormSession from "./helpers/session/createFormSession"

import startFormResponse from "./__mocks__/startFormResponse"
import nextStepWithPropsPresets from "./__mocks__/nextStepWithPropsPresets"
import nextStepFormResponse from "./__mocks__/nextStepFormResponse"

jest.mock("axios")

const formName = "partnerFormPotato"

const form = new FireboltFormEngine({
  root: "https://my-firebolt-api/",
  formName,
})

describe("start form tests", () => {
  beforeAll(() => {
    clearAllFormSessions()
  })

  test("start form correctly creates session key on localStorage", async () => {
    axios.get.mockResolvedValue({ data: startFormResponse })

    clearAllFormSessions()

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
    axios.get.mockResolvedValue({ data: nextStepFormResponse })

    const formAccess = {
      root: "https://another-firebolt-api/",
      formName: "myCustomForm",
    }
    createFormSession(formAccess.formName, "myPreviousSessionAuthKey")

    const form = new FireboltFormEngine(formAccess)
    await form.start()

    expect(axios.get).lastCalledWith(
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

  beforeEach(() => {
    clearAllFormSessions()

    axios.get.mockResolvedValue({ data: startFormResponse })

    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        search: autoFillBase64,
        href: autoFillBase64,
      },
    })
  })

  test("form.start() must autofill value prop of the field email at the fields array", async () => {
    const formStartResult = await form.start()
    expect(formStartResult.step.data.fields[1]).toHaveProperty("value")
    expect(formStartResult.step.data.fields[1].value).toBe(
      "berte.ruan@gmail.com"
    )
  })
})

describe("testing props:preset", () => {
  test("form.start() should apply props:preset", async () => {
    axios.get.mockResolvedValue({ data: nextStepWithPropsPresets })
    const formStartResult = await form.start()

    expect(formStartResult?.step?.data?.fields[0]?.["ui:props"].label).toBe("CEP")
  })
})
