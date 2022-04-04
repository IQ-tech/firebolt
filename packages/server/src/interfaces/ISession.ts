import { IExperienceJSONSchema } from "../types"
import { IFireboltSession, IStepSession } from "./IEngine"

export interface ISessionHandler {
  current?: IFireboltSession
  createSession: (schema: IExperienceJSONSchema) => Promise<string>
  updateCurrentStep: (stepSlug: string) => void
  changeCurrentFlow: (flowSlug: string) => void
  getSessionFromStorage: (
    sessionId: string | undefined
  ) => Promise<IFireboltSession | undefined>
  addCompletedStep: (stepSlug: string, stepSession: IStepSession) => void
  completeExperience: () => void
}
