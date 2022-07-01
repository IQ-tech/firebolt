// import { } from ''

export interface IExperienceConfig {
  /** test */
  "$schema-version"?: string
  "$experience-version"?: string
  name: string
  description: string
  business: string // todo remove
  decisionHandlerConfig?: IDecisionHandlerConfig
  flows: IFlow[]
  steps: IStepJSON[]
}