import { v4 } from "uuid"
import { IStepTransitionReturn } from "../interfaces/IEngine"
import { IExperienceJSONSchema } from "../types"
import computeExperienceMetadata from "./computeExperienceMetadata"

export default function createExperience(
  schema: IExperienceJSONSchema
): IStepTransitionReturn {
  const defaultFlow = schema.flows.find((x) => x.slug === "default")
  const firstStepSlug = defaultFlow?.stepsSlugs[0]
  if (!defaultFlow) throw new Error("Flow not found") // TODO: TRATAR ERRO (DEFAULT FLOW)
  const firstStep = schema.steps.find((x) => x.slug === firstStepSlug)

  if (!firstStep) throw new Error("Step not found") // TODO: TRATAR ERRO
  const experienceMetadata = computeExperienceMetadata(schema)

  const transitionReturn: IStepTransitionReturn = {
    sessionId: v4(),
    step: firstStep,
    capturedData: {},
    errors: {},
    webhookResult: {},
    experienceMetadata,
  }
  return transitionReturn
}
