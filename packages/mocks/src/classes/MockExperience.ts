import { IExperienceConfig } from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import experienceFactory from "../factories/experienceFactory"
import { IMockExperienceOptions } from "../types"

class MockExperience {
  private experience: Experience
  constructor(experienceConfig: IExperienceConfig) {
    this.experience = new Experience(experienceConfig)
  }

  static generateFrom(options: IMockExperienceOptions): MockExperience {
    const mockedExperience = experienceFactory(options)
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
}

export default MockExperience
