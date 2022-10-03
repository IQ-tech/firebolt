import axios from "axios"
import callRemote from "./callRemoteDecision"
import useMockNavigation from "../mocks/mock-navigation"
import { IExperienceDecisionPayload, IExperienceProceedPayload } from "../types"
import { IRemoteDecisionConfig, IFireboltSession } from "@iq-firebolt/entities"
import {
  MockExperience,
  payloadFactory,
  sessionFactory,
} from "@iq-firebolt/mocks"

const { mockedSetSession, mockedGetSession } = useMockNavigation()

jest.mock("axios")

describe("callRemote", () => {
  test("axios post request", async () => {
    const remoteDecision = MockExperience.generateFrom({
      flowConfig: "default-sample",
      stepConfig: "default-sample",
      decisionConfig: {
        useDecision: true,
        options: {
          strategy: "remote",
          saveProcessedData: "all",
          triggers: "all",
        },
      },
    }).rawDecisionHandler

    const oneStepCompletedFlowDefault = sessionFactory(
      "defaultOneStepCompleted"
    )
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
      String(remoteDecision!.remoteConfig?.url),
      {},
      data
    )

    expect(requestCallWebhook).toBe("Result request callWebhook")
  })
})
