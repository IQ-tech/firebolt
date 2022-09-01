export type SizeConfig = number | number[] | { items: number; contains: number }

export interface IMockFlowOption {
  size: SizeConfig
  // stops including a default flow on the flows config
  keepDefault?: boolean
  includeSlugs?: string[]
}

export interface IMockStepsOptions {
  size: SizeConfig | { custom: SizeConfig; form: SizeConfig }
  useCustom: boolean
}

export interface IMockExperienceOptions {
  flows: IMockFlowOption
  steps: number
}
