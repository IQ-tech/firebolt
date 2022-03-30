import { v4 } from "uuid"
import {
  IEngineResolvers,
  IExperienceMetadata,
  IExperienceState,
} from "./interfaces/IEngine"
import { ISessionHandler } from "./interfaces/ISession"
import { IExperienceJSONSchema } from "./types"

class SessionHandler implements ISessionHandler {
  private resolvers: IEngineResolvers

  constructor(resolvers: IEngineResolvers) {
    this.resolvers = resolvers
  }

  async createSession(schema: IExperienceJSONSchema): Promise<void> {
    const defaultFlow = schema.flows.find((x) => x.slug === "default")
    if (!defaultFlow) throw new Error("Flow not found") // TODO: Handle Error

    const firstStepSlug = defaultFlow?.stepsSlugs[0]

    const experienceState: IExperienceState = {
      currentFlow: "default",
      currentPosition: 1,
      currentStepSlug: firstStepSlug,
      lastCompletedStepSlug: "",
    }

    this.resolvers.setSession({
      sessionId: v4(),
      experienceState,
      experienceMetadata: {} as IExperienceMetadata,
      steps: {},
    })
  }

  setCurrentStep() {}

  changeCurrentFlow() {}

  addCompletedStep() {}

  completeExperience() {}
}

export default SessionHandler
