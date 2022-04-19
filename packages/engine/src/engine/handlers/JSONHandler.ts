import JSONConfig from "../../classes/JSONConfig"
import EngineError from "../../classes/EngineError"
import { IExperienceJSONSchema } from "../../types"
import { IEngineResolvers, IFireboltSession } from "../../interfaces/IEngine"
import validateJSON from "../../helpers/validateJSON"

class JSONHandler {
  private preDefinedJSONConfig?: IExperienceJSONSchema
  private JSONConfig?: JSONConfig
  private resolvers: IEngineResolvers
  private experienceId: string

  constructor({
    experienceJSONConfig,
    resolvers,
    experienceId,
  }: {
    experienceJSONConfig: IExperienceJSONSchema | undefined
    resolvers: IEngineResolvers
    experienceId: string
  }) {
    this.preDefinedJSONConfig = experienceJSONConfig
    this.resolvers = resolvers
    this.experienceId = experienceId
  }

  get config() {
    return this.JSONConfig
  }

  async loadJSONConfig() {
    const hasPredefinedJSONConfig = !!this.preDefinedJSONConfig
    const hasJSONConfigResolver = !!this.resolvers.getExperienceJSON

    if (!hasPredefinedJSONConfig && !hasJSONConfigResolver) {
      throw new EngineError("noWayToFindJSONConfig")
    }

    if (!!this.preDefinedJSONConfig) {
      this.JSONConfig = new JSONConfig(this.preDefinedJSONConfig)
    } else if (!!this.resolvers.getExperienceJSON) {
      const newJSON = await this.resolvers.getExperienceJSON(this.experienceId)
      if (!newJSON) {
        throw new EngineError("JSONNotFound")
      }
      this.JSONConfig = new JSONConfig(newJSON)
    }
    if (!!this.JSONConfig) {
      validateJSON(this.JSONConfig.raw)
    }
  }

  getReceivingStepSlug({
    session,
  }: {
    session: IFireboltSession | undefined
  }): string {
    const receivingStepSlug = session
      ? session.experienceState.visualizingStepSlug
      : this.JSONConfig!.getFirstStepFromFlow("default")?.slug

    if (!receivingStepSlug) {
      throw new EngineError("stepNotFound")
    }
    return receivingStepSlug
  }

  getReturningStepDefinition(stepSlug: string, session?: IFireboltSession) {
    const receivingFlowSlug = session?.experienceState?.currentFlow || "default"
    const receivingFlow = this.getFlow(receivingFlowSlug)
    const receivingStepIndex = receivingFlow.stepsSlugs.indexOf(stepSlug)
    const returningStepSlug = receivingFlow?.stepsSlugs[receivingStepIndex + 1]
    if (returningStepSlug) {
      return this.getStepDefinition(returningStepSlug)
    }
  }

  getFlow(flowSlug: string) {
    const flow = this.JSONConfig!.getFlow(flowSlug)
    if (!flow) {
      throw new EngineError(
        "JSONWithoutSpecifiedFlow",
        `Decision callback action error. The new flow: '${flowSlug}' does not exist on JSON config.`
      )
    }
    return flow
  }

  getStepDefinition(stepSlug: string) {
    const stepDefinition = this.JSONConfig?.getStepDefinition(stepSlug)
    if (!stepDefinition) {
      throw new EngineError("stepNotFound")
    }
    return stepDefinition
  }
}

export default JSONHandler
