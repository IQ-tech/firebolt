import { IExperienceConfig } from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import experienceFactor from "../../factories/experienceFactory"

export interface IMockExperience {
  experience?: IExperienceConfig
  options?: IMockExperienceOptions
}

export interface IMockExperienceOptions {
  flows: IMockFlowOption
  steps: number
}

export interface IMockFlowOption {
  quantity: number
  steps: number[]
}

class MockExperience {
  private sample: Experience
  constructor({ experience, options }: IMockExperience) {
    this.sample = experience
      ? new Experience(experience)
      : experienceFactor(options)
  }

  get raw() {
    return this.sample.raw
  }
}
