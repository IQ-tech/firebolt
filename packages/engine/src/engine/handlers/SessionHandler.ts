import { v4 } from "uuid"
import {
  IEngineResolvers,
  IExperienceMetadata,
  IExperienceState,
  IFireboltSession,
  IStepSession,
} from "../../interfaces/IEngine"
import JSONConfig from "../../classes/JSONConfig"
import EngineError from "../../classes/EngineError"

class SessionHandler {
  private resolvers: IEngineResolvers
  private sessionId?: string
  private _current?: IFireboltSession

  constructor(resolvers: IEngineResolvers) {
    this.resolvers = resolvers
  }

  async loadSessionFromStorage(sessionId: string | undefined) {
    const session = (await this.resolvers.getSession(
      sessionId
    )) as IFireboltSession

    if (session && !this.isValidSession(session)) {
      throw new EngineError(
        "resolverReturnIsInvalid",
        `Invalid session value: ${JSON.stringify(session)}`
      )
    }

    this.current = session
  }

  private isValidSession(session: any): session is IFireboltSession {
    return (
      "sessionId" in session &&
      "experienceState" in session &&
      "lastCompletedStepSlug" in session.experienceState &&
      "visualizingStepSlug" in session.experienceState &&
      "currentFlow" in session.experienceState &&
      "completedExperience" in session.experienceState &&
      "steps" in session
    )
  }

  private setSessionId(sessionId: string) {
    this.sessionId = sessionId
  }

  get current() {
    return this._current as IFireboltSession
  }

  set current(session: IFireboltSession) {
    this._current = session
  }

  private async updateSession(newSession: IFireboltSession) {
    await this.resolvers.setSession(newSession)

    const currentSession = (await this.resolvers.getSession(
      this.current?.sessionId ?? this.sessionId
    )) as IFireboltSession
    this.current = currentSession
  }

  // return session id on create session
  async createSession(jsonConfig: JSONConfig, flow = "default") {
    const defaultFlow = jsonConfig.getFlow("default")
    if (defaultFlow) {
      const firstStepSlug = defaultFlow?.stepsSlugs[0]
      const newSessionId = v4()
      this.setSessionId(newSessionId)

      const initialState: IExperienceState = {
        currentFlow: flow,
        visualizingStepSlug: firstStepSlug,
        lastCompletedStepSlug: firstStepSlug,
        completedExperience: false,
      }

      const initialSession = {
        sessionId: newSessionId,
        experienceState: initialState,
        experienceMetadata: {} as IExperienceMetadata,
        steps: {},
      }

      await this.updateSession(initialSession)
    }
  }

  async changeCurrentFlow(flowSlug: string) {
    const currentState = this.current?.experienceState
    const newState: IExperienceState = {
      ...currentState,
      currentFlow: flowSlug,
    }
    const newSession: IFireboltSession = {
      ...this.current,
      experienceState: newState,
    }

    await this.updateSession(newSession)
  }

  // atualiza o last completed state
  async addCompletedStep(stepSlug: string, stepSession: IStepSession) {
    const currentState = this.current?.experienceState

    const newStepsCompleted = {
      ...this.current?.steps,
      [stepSlug]: stepSession,
    }
    const newSession: IFireboltSession = {
      ...this.current,
      experienceState: {
        ...currentState,
        lastCompletedStepSlug: stepSlug,
      },
      steps: newStepsCompleted,
    }

    await this.updateSession(newSession)
  }

  async setVisualizingStepSlug(stepSlug: string) {
    const newSession: IFireboltSession = {
      ...this.current,
      experienceState: {
        ...this.current?.experienceState,
        visualizingStepSlug: stepSlug,
      },
    }

    await this.updateSession(newSession)
  }

  async completeExperience() {
    const newState: IExperienceState = {
      ...this.current?.experienceState,
      completedExperience: true,
    }
    const newSession: IFireboltSession = {
      ...this.current,
      experienceState: newState,
    }
    await this.updateSession(newSession)
  }
}

export default SessionHandler
