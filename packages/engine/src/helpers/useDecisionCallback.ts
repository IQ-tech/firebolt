import {
  IExperienceProceedPayload,
  IExperienceDecisionCallbackFunction,
  IExperienceDecision,
  IExperienceDecisionAction,
  IExperienceDecisionOptions,
  IFireboltSession,
} from "../types"
import {
  IDecisionHandlerConfig,
  IRemoteDecisionConfig,
} from "@iq-firebolt/entities"

import callRemoteDecision from "./callRemoteDecision"

interface IUseDecisionCallback {
  decisionCB?: IExperienceDecisionCallbackFunction
  payload: IExperienceProceedPayload
  decisionHandlerConfig?: IDecisionHandlerConfig
  session: IFireboltSession
  receivingStepSlug: string
}
export default function useDecisionCallback({
  decisionCB,
  payload,
  session,
  decisionHandlerConfig,
  receivingStepSlug,
}: IUseDecisionCallback): Promise<IExperienceDecision> {
  const decisionCallbackStrategy = decisionHandlerConfig?.strategy
  return new Promise((res) => {
    const decide = (
      action: IExperienceDecisionAction,
      options?: IExperienceDecisionOptions
    ) => {
      res({ action, options })
    }

    if (decisionCallbackStrategy === "local" && decisionCB) {
      decisionCB(decide, {
        sessionData: session,
        receivingStepData: payload,
      })
    }

    if (decisionCallbackStrategy === "remote") {
      const { url, headers = {} } = decisionHandlerConfig!
        .remoteConfig as IRemoteDecisionConfig
      const chosenUrl = typeof url === "object" ? url[receivingStepSlug] : url

      callRemoteDecision(chosenUrl, headers, {
        sessionData: session,
        receivingStepData: payload,
      }).then((webhookResponse) => {
        res(webhookResponse)
      })
    }
  })
}
