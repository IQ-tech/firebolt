import { IDecisionHandlerConfig } from "@iq-firebolt/entities"

export default function getShouldSaveProcessedData(
  receivingStepSlug: string,
  decisionHandlerConfig?: IDecisionHandlerConfig
): boolean {
  const safeDecisionConfig =
    decisionHandlerConfig || ({} as IDecisionHandlerConfig)
  const stepsToSave = safeDecisionConfig?.saveProcessedData
  if (stepsToSave === "all") return true
  return stepsToSave?.includes(receivingStepSlug)
}
