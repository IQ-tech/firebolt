import EngineError from "../classes/EngineError"
import { IDecisionHandlerConfig } from "@iq-firebolt/entities"

export default function shouldUseDecisionHandler(
  decisionHandlerConfig: IDecisionHandlerConfig | undefined,
  hasDecisionCallback: boolean,
  receivingStepSlug: string
): boolean {
  if (!decisionHandlerConfig || !decisionHandlerConfig?.strategy) {
    return false
  }
  const { strategy } = decisionHandlerConfig
  const isLocal = strategy === "local"
  const isRemote = strategy === "remote"
  const remoteConfig = decisionHandlerConfig?.remoteConfig
  if (isLocal && !hasDecisionCallback) {
    throw new EngineError("localDecisionCallbackNotProvided")
  } else if (isRemote && !remoteConfig) {
    throw new EngineError("remoteDecisionConfigNotProvided")
  }

  if (decisionHandlerConfig.triggers === "all") {
    return true
  }

  return decisionHandlerConfig.triggers.includes(receivingStepSlug)
}
