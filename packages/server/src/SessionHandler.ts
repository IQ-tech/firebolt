import { v4 } from "uuid"
import {
  IEngineResolvers,
  IExperienceMetadata,
  IExperienceState,
  IFireboltSession,
  IStepSession,
} from "./interfaces/IEngine"
import { ISessionHandler } from "./interfaces/ISession"
import { IExperienceJSONSchema } from "./types"

class SessionHandler implements ISessionHandler {
  private resolvers: IEngineResolvers
  private sessionId?: string

  constructor(resolvers: IEngineResolvers) {
    this.resolvers = resolvers
  }

  async getSessionFromStorage(sessionId: string | undefined) {
    return await this.resolvers.getSession(sessionId)
  }

  private setSessionId(sessionId: string) {
    this.sessionId = sessionId
  }

  private async getCurrentSession() {
    return await this.resolvers.getSession(this.sessionId)
  }

  async createSession(
    schema: IExperienceJSONSchema,
    flow = "default"
  ): Promise<void> {
    const defaultFlow = schema.flows.find((x) => x.slug === flow)
    if (!defaultFlow) throw new Error("Flow not found") // TODO: Handle Error

    const firstStepSlug = defaultFlow?.stepsSlugs[0]
    const newSessionId = v4()
    this.setSessionId(newSessionId)

    const initialState: IExperienceState = {
      currentFlow: flow,
      currentStepSlug: firstStepSlug,
      lastCompletedStepSlug: firstStepSlug,
      completedExperience: false,
    }

    this.resolvers.setSession({
      sessionId: newSessionId,
      experienceState: initialState,
      experienceMetadata: {} as IExperienceMetadata,
      steps: {},
    })
  }

  async updateCurrentStep(stepSlug: string) {
    const currentSession = await this.getCurrentSession()
    if (!currentSession) return // TODO: add erro

    const currentState = currentSession?.experienceState
    const newState: IExperienceState = {
      ...currentState,
      currentStepSlug: stepSlug,
    }

    const newSession: IFireboltSession = {
      ...currentSession,
      experienceState: newState,
    }

    this.resolvers.setSession(newSession)
  }

  async changeCurrentFlow(flowSlug: string) {
    const currentSession = await this.getCurrentSession()
    if (!currentSession) return // TODO: add error
    const currentState = currentSession.experienceState
    const newState: IExperienceState = {
      ...currentState,
      currentFlow: flowSlug,
    }
    const newSession: IFireboltSession = {
      ...currentSession,
      experienceState: newState,
    }

    this.resolvers.setSession(newSession)
  }

  // atualiza o last completed state
  async addCompletedStep(stepSlug: string, stepSession: IStepSession) {
    const currentSession = await this.getCurrentSession()
    if (!currentSession) return // TODO: add error
    const currentState = currentSession?.experienceState

    const newStepsCompleted = {
      ...currentSession.steps,
      [stepSlug]: stepSession,
    }
    const newSession: IFireboltSession = {
      ...currentSession,
      experienceState: {
        ...currentState,
        lastCompletedStepSlug: stepSlug,
      },
      steps: newStepsCompleted,
    }

    this.resolvers.setSession(newSession)
  }

  async completeExperience() {
    const currentSession = await this.getCurrentSession()
    if (!currentSession) return // todo add error
    const newState: IExperienceState = {
      ...currentSession.experienceState,
      completedExperience: true,
    }

    this.resolvers.setSession({ ...currentSession, experienceState: newState })
  }
}

export default SessionHandler
