import { IStepConfig } from "@iq-firebolt/entities"
import { IMockStepType } from "../types"
import defaultExperience from "../presets/sample-experience"

const stepFactory = (stepOption: IMockStepType): IStepConfig[] => {
  let stepConfig: IStepConfig[] = []
  switch (stepOption) {
    case "without-steps":
      stepConfig = []
      break

    default:
      stepConfig = defaultExperience.steps
      break
  }

  return stepConfig
}

export default stepFactory
