import axios from "axios"
import callRemote from "./callRemoteDecision"
import useMockNavigation from "../mocks/mock-navigation"
import { oneStepCompletedFlowDefault } from "../mocks/sample-experience-session"
import { IExperienceDecisionPayload, IExperienceProceedPayload } from "../types"
import { IRemoteDecisionConfig, IFireboltSession } from "@iq-firebolt/entities"
import sampleWithRemoteConfig from "../mocks/sample-experience-with-remote-decision"

const { mockedSetSession, mockedGetSession } = useMockNavigation()

jest.mock("axios")

describe("callRemote", () => {
  test("axios post request", async () => {
    const remoteConfig = sampleWithRemoteConfig()!.decisionHandlerConfig!
      .remoteConfig as IRemoteDecisionConfig

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
    const requestCallWebhook = await callRemote(
      String(remoteConfig.url),
      {},
      data
    )

    expect(requestCallWebhook).toBe("Result request callWebhook")
  })
})
