import {
  IExperienceConfig,
  IDecisionHandlerConfig,
} from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import { IMockExperienceOption } from "../types"

import flowFactory from "../factories/flowFactory"
import stepFactory from "../factories/stepFactory"
import decisionFactory from "../factories/decisionFactory"

import defaultExperience from "../presets/sample-experience"
class MockExperience {
  private experience: Experience
  constructor(experienceConfig?: IExperienceConfig) {
    if (!experienceConfig) this.experience = new Experience(defaultExperience)
    else this.experience = new Experience(experienceConfig)
  }

  static generateFrom(options: IMockExperienceOption): MockExperience {
    const { flowConfig, stepConfig, decisionConfig } = options
    const flows = flowFactory(flowConfig)
    const steps = stepFactory(stepConfig)

    const { useDecision, options: decisionOptions } = decisionConfig
    const decision: IDecisionHandlerConfig = useDecision
      ? decisionFactory(decisionOptions)
      : ({} as IDecisionHandlerConfig)

    const mockedExperience: IExperienceConfig = {
      ...defaultExperience,
      flows: flows,
      steps: steps,
      decisionHandlerConfig: decision,
    }

    return new MockExperience(mockedExperience)
  }

  private updateExperience(newExperience: Experience) {
    this.experience = newExperience
  }

  changeFlowSlug(flowSlug: string, newFlowSlug: string) {
    const flow = this.experience.getFlow(flowSlug)

    if (!flow) throw new Error("Flow not found")
    const newFlowRaw = { ...flow.raw, slug: newFlowSlug }
    const flows = this.experience.raw.flows
    const newFlowsRaw = flows.map((flowConfig) =>
      flowConfig.slug === flowSlug ? newFlowRaw : flowConfig
    )
    const newRawExperience: IExperienceConfig = {
      ...this.experience.raw,
      flows: newFlowsRaw,
    }

    this.updateExperience(new Experience(newRawExperience))
  }

  get rawExperience() {
    return this.experience.raw
  }

  get rawFlows() {
    return this.experience.raw.flows
  }

  get rawSteps() {
    return this.experience.raw.steps
  }

  get rawDecisionHandler() {
    return this.experience.raw?.decisionHandlerConfig
  }
}

export default MockExperience
