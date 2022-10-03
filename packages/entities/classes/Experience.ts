import Step from "./Step"
import Flow from "./Flow"
import { IExperienceConfig } from "../types"

class Experience {
  private rawConfig: IExperienceConfig
  private steps: Step[]
  private flows: Flow[]

  constructor(rawConfig: IExperienceConfig) {
    this.rawConfig = rawConfig
    this.steps = rawConfig?.steps?.map((stepRaw) => new Step(stepRaw))
    this.flows = rawConfig?.flows?.map((flowRaw) => new Flow(flowRaw))
  }

  get raw() {
    return this.rawConfig
  }

  get name() {
    return this.rawConfig.name
  }

  getStepBySlug(slug: string) {
    return this.steps?.find((step) => step.slug === slug)
  }

  getFlow(flowSlug: string) {
    return this.flows?.find((flow) => flow.slug === flowSlug)
  }

  getFlowSteps(flowSlug: string): Step[] | undefined {
    const usedFlow = this.getFlow(flowSlug)
    if (usedFlow) {
      const usedFlowSlugs = usedFlow.stepList
      const stepMap = this.steps.reduce((acc, step) => {
        const stepSlug = step.slug
        return { ...acc, [stepSlug]: step }
      }, {} as { [stepKey: string]: Step })
      return usedFlowSlugs.map((slug) => stepMap[slug])
    }
  }

  getFirstStepFromFlow(flowSlug: string) {
    const flowSteps = this.getFlowSteps(flowSlug)
    if (flowSteps) {
      return flowSteps[0]
    }
  }

  getStepByIndex(index: number, flowSlug: string = "default") {
    const flowSteps = this.getFlowSteps(flowSlug)
    if (flowSteps) {
      return flowSteps[index]
    }
  }

  getStepByPosition(position: number, flowSlug: string = "default") {
    return this.getStepByIndex(position - 1, flowSlug)
  }
}

export default Experience
