import axios from "axios"
import { vi, type MockedFunction } from "vitest"
import APIService from "./API"

import startFormResponse from "../__mocks__/startFormResponse"
import nextStepFormResponse from "../__mocks__/nextStepFormResponse"
import previousStepFormResponse from "../__mocks__/previousStepFormResponse"

vi.mock("axios")

describe("Navigation requests receive correct data", () => {
  const serviceInstance = new APIService({
    formAccess: {
      root: "asdsf",
      formName: "ajshf",
    },
  })

  const expectedNewStep = expect.objectContaining({
    auth: expect.any(String),
    capturedData: expect.any(Object),
    meta: expect.objectContaining({
      lastStep: expect.any(Number),
      steps: expect.arrayContaining([
        expect.objectContaining({
          friendlyName: expect.any(String),
          position: expect.any(Number),
          slug: expect.any(String),
        }),
      ]),
    }),
    step: expect.objectContaining({
      webhookResult: expect.any(Object),
      position: expect.any(Number),
      data: expect.objectContaining({
        slug: expect.any(String),
        type: expect.any(String),
        friendlyName: expect.any(String),
      }),
    }),
  })

  test("start form return correct data", async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: startFormResponse })
    const response = await serviceInstance.getStartForm()
    expect(response).toEqual(expectedNewStep)
  })

  test("next step return correct data", async () => {
    ;(axios.post as MockedFunction<typeof axios.post>).mockResolvedValue({ data: nextStepFormResponse })
    const response = await serviceInstance.getNextStep(
      "sessionKey",
      "personal_data",
      { stepFieldsPayload: "test cenoura", requestsMetadata: "paranaue" }
    )
    // { name: "teste cenoura", email: "batata@teste.com" }
    expect(response).toEqual(expectedNewStep)
  })

  test("previous step must return correct data", async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: previousStepFormResponse,
    })
    const response = await serviceInstance.getPreviousStep(
      "sessionKey",
      "personal_data"
    )

    expect(response).toEqual(expectedNewStep)
  })

  test.todo("debug step must return correct data")

  test.todo("upload step working correctly") // descobrir se da pra testar de alguma forma
})

describe("API Error handling work correctly", () => {
  test.todo("throw correct errors on connection error")
  test.todo("throw correct errors on validation error")
})
