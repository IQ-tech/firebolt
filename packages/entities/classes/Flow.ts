import { IFlow } from "../types"
import Step from "./Step"

class Flow {
  private flowConfig: IFlow
  constructor(flowConfig: IFlow) {
    this.flowConfig = flowConfig
  }

  get raw() {
    return this.flowConfig
  }

  get slug() {
    return this.flowConfig.slug
  }

  get stepList() {
    return this.flowConfig.stepsSlugs
  }
}

export default Flow
