import axios from "axios"
import callWebhook from "./callWebhook"
import useMockNavigation from "../mocks/mock-navigation"
import { oneStepCompletedFlowDefault } from "../mocks/sample-experience-session"
import {
  IFireboltSession,
  IExperienceDecisionPayload,
  IExperienceProceedPayload,
} from "../interfaces/IEngine"
import { IWebhookConfig } from "../types"
import sampleWithWebhookConfig from "../mocks/sample-experience-with-webhook"

const { mockedSetSession, mockedGetSession } = useMockNavigation()

jest.mock("axios")

describe("callWebhook", () => {
  test("axios post request", async () => {
    const webhookConfig = sampleWithWebhookConfig()?.webhookConfig as IWebhookConfig
    mockedSetSession(oneStepCompletedFlowDefault)
    const currentSession = (await mockedGetSession(
      oneStepCompletedFlowDefault.sessionId
    )) as IFireboltSession

    const payload: IExperienceProceedPayload = {
      sessionId: oneStepCompletedFlowDefault.sessionId,
      fields: { brazil_id_number: "1234567890" },
    }

    const data: IExperienceDecisionPayload = {
      receivingStepData: payload,
      sessionData: currentSession,
    }

    ;(axios.post as jest.Mock).mockResolvedValue({
      data: "Result request callWebhook",
    })
   const requestCallWebhook = await callWebhook(webhookConfig, data)

    expect(requestCallWebhook).toBe("Result request callWebhook")
  })
})
