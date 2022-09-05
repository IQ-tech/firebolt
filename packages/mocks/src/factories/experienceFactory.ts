import { IExperienceConfig } from "@iq-firebolt/entities"
//import { IMockExperienceOptions } from "../types"

import sampleDefault from "../presets/sample-experience"
import flowFactory from "./flowFactory"

const experienceFactory = (
  options: IMockExperienceOptions | undefined
): IExperienceConfig => {
  if (!options) return sampleDefault

  const { flows, steps } = options
  const flowsConfig = flowFactory(flows)

  return {
    ...sampleDefault,
    flows: flowsConfig,
  }
}

export default experienceFactory
