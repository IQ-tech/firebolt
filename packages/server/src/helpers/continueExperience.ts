import computeExperienceMetadata from "./computeExperienceMetadata"
import { IExperienceJSONSchema } from "../types"
import { IFireboltSession, IStepTransitionReturn } from "../interfaces/IEngine"

export default function continueExperience(
  schema: IExperienceJSONSchema,
  session: IFireboltSession
): IStepTransitionReturn {
  const currentFlowSlug = session.experienceMetadata.currentFlow ?? "default"
  const currentFlow = schema.flows.find((x) => x.slug === currentFlowSlug)
  if (!currentFlow) throw new Error("Flow Not found") // TODO: Tratar erro de flow nao encontrado

  const lastCompletedStepIndex = currentFlow.stepsSlugs.indexOf(
    session.experienceMetadata.lastCompletedStepSlug
  )

  const currentStep = schema.steps.find(
    (x) => x.slug === currentFlow.stepsSlugs[lastCompletedStepIndex + 1]
  )

  if (!currentStep) throw new Error("Step not found") // TODO: Tratar erro de step nao encontrado

  const metadata = computeExperienceMetadata(schema, session)
  return {
    sessionId: session.sessionId,
    experienceMetadata: metadata,
    step: currentStep,
    capturedData: session.steps,
    errors: [],
    webhookResult: [],
  }
}
