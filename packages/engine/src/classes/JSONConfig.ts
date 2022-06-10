import { IExperienceJSONSchema } from "../types"

export default class JSONConfig {
  private JSONConfig: IExperienceJSONSchema

  constructor(JSONExperienceDefinition: IExperienceJSONSchema) {
    this.JSONConfig = JSONExperienceDefinition
  }

  get name() {
    return this.JSONConfig.name
  }

  get flows() {
    return this.JSONConfig.flows
  }

  get steps() {
    return this.JSONConfig.steps
  }

  get raw() {
    return this.JSONConfig
  }

  getFirstStepFromFlow(flowSlug = "default") {
    const flow = this.getFlow(flowSlug)
    const firstStep = flow?.stepsSlugs[0]
    return this.getStepDefinition(firstStep)
  }
  getFlow(flowSlug: string = "default") {
    return this.flows?.find((flow) => flow.slug === flowSlug)
  }
  getStepDefinition(stepSlug: string = "") {
    return this.steps?.find((step) => step.slug === stepSlug)
  }
}
