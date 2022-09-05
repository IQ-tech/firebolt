import { IExperienceConfig } from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import { IMockExperienceOption } from "../types"
import defaultExperience from "../presets/sample-experience"
import flowFactory from "../factories/flowFactory"
import stepFactory from "../factories/stepFactory"

class MockExperience {
  private experience: Experience
  constructor(experienceConfig?: IExperienceConfig) {
    if (!experienceConfig) this.experience = new Experience(defaultExperience)
    else this.experience = new Experience(experienceConfig)
  }

  static generateFrom(options: IMockExperienceOption): MockExperience {
    const { flowConfig, stepConfig } = options
    const flows = flowFactory(flowConfig)
    const steps = stepFactory(stepConfig)

    const mockedExperience = {
      ...defaultExperience,
      flows,
      steps,
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
}

export default MockExperience
