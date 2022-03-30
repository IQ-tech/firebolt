import { IExperienceJSONSchema } from "../types"
import { IEngineResolvers } from "./IEngine"

export interface ISessionHandler {
  createSession: (schema: IExperienceJSONSchema) => Promise<void>
  setCurrentStep: () => void
  changeCurrentFlow: () => void
  addCompletedStep: () => void
  completeExperience: () => void
}
