import { IFlow } from "@iq-firebolt/entities"
import { IMockFlowType } from "../types"

import defaultExperience from "../presets/sample-experience"

const flowFactory = (flow: IMockFlowType): IFlow[] => flowMap[flow]

const flowMap = {
  "missing-step-list": [
    {
      "slug": "default",
      "stepsSlugs": [],
    },
  ],
  "missing-step": [
    {
      "slug": "default",
      "stepsSlugs": ["personal_data", "missing_step", "address", "bills"],
    },
  ],
  "missing-default": [
    {
      "slug": "medium",
      "stepsSlugs": ["personal_data", "documents", "token"],
    },
  ],
  "default-sample": defaultExperience.flows,
}

export default flowFactory
