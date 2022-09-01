import { IFlow } from "@iq-firebolt/entities"
import Flow from "@iq-firebolt/entities/classes/Flow"
import flowFactory from "../factories/flowFactory"
import defaultExperience from "../presets/sample-experience"
import { IMockFlowOption } from "../types"

class MockFlow {
  private flows: Flow[]
  private flowConfig: IFlow[]

  constructor(flows?: IFlow[], options?: IMockFlowOption) {
    this.flowConfig = flows
      ? flows
      : options
      ? flowFactory(options)
      : defaultExperience.flows

    this.flows = this.flowConfig.map((flow) => new Flow(flow))
  }

  get raw() {
    return this.flowConfig
  }
}

export default MockFlow
