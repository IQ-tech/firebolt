import faker from "faker"
import Experience from "@iq-firebolt/entities/classes/Experience"
import { IFlow } from "@iq-firebolt/entities"
import Flow from "@iq-firebolt/entities/classes/Flow"

import { IMockExperienceOptions } from "../presets/sample"

import sampleDefault from "../presets/sample-experience"

const experienceFactory = (
  options: IMockExperienceOptions | undefined
): Experience => {
  if (!options) return new Experience(sampleDefault)

  const { flows, steps } = options

  return new Experience(sampleDefault)
}

export default experienceFactory
