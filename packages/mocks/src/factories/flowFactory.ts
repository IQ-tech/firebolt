import { IFlow } from "@iq-firebolt/entities"
import { IMockFlowType } from "../types"

import defaultExperience from "../presets/sample-experience"

const flowFactory = (flow: IMockFlowType): IFlow[] => {
  let flowConfig: IFlow[] = []
  switch (flow) {
    case "missing-default":
      flowConfig = [
        {
          "slug": "medium",
          "stepsSlugs": ["personal_data", "documents", "token"],
        },
      ]
      break
    case "missing-step":
      flowConfig = [
        {
          "slug": "default",
          "stepsSlugs": ["personal_data", "missing_step", "address", "bills"],
        },
      ]
      break
    case "missing-step-list":
      flowConfig = [
        {
          "slug": "default",
          "stepsSlugs": [],
        },
      ]
      break

    default:
      flowConfig = defaultExperience.flows
      break
  }

  return flowConfig
}

export default flowFactory
