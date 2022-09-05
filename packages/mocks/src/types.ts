export type IMockFlowType =
  | "default-sample"
  | "missing-default"
  | "missing-step"
  | "missing-step-list"

export type IMockStepType = "default-sample" | "without-steps"

export interface IMockExperienceOption {
  flowConfig: IMockFlowType
  stepConfig: IMockStepType
}
