import { IExperienceJSONSchema } from "../types"
import EngineError from "./EngineError"

export default class JSONConfig {
  private JSONConfig: IExperienceJSONSchema

  constructor(JSONExperienceDefinition: IExperienceJSONSchema) {
    this.validateJSON(JSONExperienceDefinition)
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

  private validateJSON(JSONExperienceDefinition: IExperienceJSONSchema) {
    //
    const defaultFlow = JSONExperienceDefinition.flows.find(
      (x) => x.slug === "default"
    )
    if (!defaultFlow) {
      throw new EngineError("JSONWithoutDefaultFlow")
    }

    if (!!defaultFlow && !defaultFlow.stepsSlugs.length) {
      throw new EngineError("flowWithoutSteps")
    }

    if (!JSONExperienceDefinition?.steps?.length) {
      throw new EngineError("stepListNotProvided")
    }
  }

  getFirstStepFromFlow(flowSlug = "default") {
    const flow = this.getFlow(flowSlug)
    const firstStep = flow?.stepsSlugs[0]
    return this.getStepDefinition(firstStep)
  }
  getFlow(flowSlug: string = "default") {
    const flow = this.flows.find((flow) => flow.slug === flowSlug)
    if (!flow) {
      throw new EngineError("JSONWithoutSpecifiedFlow")
    }
    return flow
  }
  getStepDefinition(stepSlug: string) {
    const step = this.steps.find((step) => step.slug === stepSlug)
    if (!step) {
      throw new EngineError("stepNotFound")
    }
    return step
  }
}
