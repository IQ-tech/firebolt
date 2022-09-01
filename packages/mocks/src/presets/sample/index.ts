import { IExperienceConfig } from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import experienceFactor from "../../factories/experienceFactory"
import { IMockExperienceOptions } from "../../types"

interface IMockExperience {
  experience?: IExperienceConfig
  options?: IMockExperienceOptions
}

class MockExperience {
  private sample: Experience
  constructor({ experience, options }: IMockExperience) {
    this.sample = experience
      ? new Experience(experience)
      : new Experience(experienceFactor(options))
  }

  get raw() {
    return this.sample.raw
  }
}

export default MockExperience
