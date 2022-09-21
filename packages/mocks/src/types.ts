import { IDecisionHandlerConfig } from "@iq-firebolt/entities"

export type IMockFlowType =
  | "default-sample"
  | "missing-default"
  | "missing-step"
  | "missing-step-list"

export type IMockStepType = "default-sample" | "without-steps"

export interface IDecisionConfig {
  useDecision: boolean
  options?: IDecisionHandlerConfig
}

export interface IMockExperienceOption {
  flowConfig: IMockFlowType
  stepConfig: IMockStepType
  decisionConfig: IDecisionConfig
}

export interface IMockPayloadOptions {
  stepSlug: string
  validFields: boolean
}
