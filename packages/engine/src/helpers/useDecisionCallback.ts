import {
  IExperienceProceedPayload,
  IExperienceDecisionCallbackFunction,
  IExperienceDecision,
  IExperienceDecisionAction,
  IExperienceDecisionOptions,
  IDecisionCallbackStrategy,
  IFireboltSession,
} from "../interfaces/IEngine"
import { IWebhookTrigger, IWebhookConfig } from "../types"

import callWebhook from "./callWebhook"

interface IUseDecisionCallback {
  decisionCB: IExperienceDecisionCallbackFunction
  payload: IExperienceProceedPayload
  stepWebhookDefinition?: IWebhookTrigger
  decisionCallbackStrategy: IDecisionCallbackStrategy
  session: IFireboltSession
  webhookConfig?: IWebhookConfig
}
export default function useDecisionCallback({
  decisionCB,
  payload,
  stepWebhookDefinition,
  webhookConfig,
  decisionCallbackStrategy,
  session,
}: IUseDecisionCallback): Promise<IExperienceDecision> {
  return new Promise((res) => {
    const decide = (
      action: IExperienceDecisionAction,
      options?: IExperienceDecisionOptions
    ) => {
      res({ action, options })
    }

    if (decisionCallbackStrategy === "internal") {
      decisionCB(decide, {
        sessionData: session,
        receivingStepData: payload,
      })
    }

    if (decisionCallbackStrategy === "external") {
      if (webhookConfig && stepWebhookDefinition) {
        callWebhook(webhookConfig, session).then((webhookResponse) => {
          res(webhookResponse)
        })
      }
    }
  })
}
