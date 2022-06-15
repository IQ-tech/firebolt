import axios from "axios"
import callWebhook from "./callWebhook"
import useMockNavigation from "../mocks/mock-navigation"
import { twoStepsCompletedFlowDefault } from "../mocks/sample-experience-session"
import { IFireboltSession } from "../interfaces/IEngine"

const { mockedSetSession, mockedGetSession } = useMockNavigation()

jest.mock("axios")

describe("callWebhook", () => {
  test("testing callwebhook request", async () => {
    const webhookConfig = {
      "triggers": [
        {
          "slug": "personal_data",
          "saveProcessedData": true,
        },
        {
          "slug": "documents",
          "saveProcessedData": false,
        },
      ],
      "url": "https://teste.com.br",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer ",
      },
    }

    mockedSetSession(twoStepsCompletedFlowDefault)
    const currentSession = (await mockedGetSession(
      twoStepsCompletedFlowDefault.sessionId
    )) as IFireboltSession

    (axios.post as jest.Mock).mockResolvedValue({
      data: "Result request callWebhook",
    })
    const requestCallWebhook = await callWebhook(webhookConfig, currentSession)

    expect(requestCallWebhook).toBe("Result request callWebhook")
  })
})
