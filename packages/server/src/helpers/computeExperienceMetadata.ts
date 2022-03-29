import { IExperienceJSONSchema, IStepJSON } from "../types"
import {
  IFlowStepsListItem,
  IExperienceMetadata,
  IFireboltSession,
} from "../interfaces/IEngine"

/**
 * Each step transition, this function computes the experience metadata sent to the consumer,
 * this metadata includes:
 * - the current step position
 * - all possible steps of the current flow

 */

export default function computeExperienceMetadata(
  schema: IExperienceJSONSchema,
  session?: IFireboltSession,
  previous = false
) {
  const currentFlow = session?.experienceMetadata?.currentFlow ?? "default"
  const flowSteps = schema.flows.find((x) => x.slug === currentFlow)?.stepsSlugs
  if (!flowSteps) throw new Error("Flow not found") // TODO: ERRO - retornar erro flow não encontrado
  const lastStepPosition = flowSteps?.length
  const lastStepSlug = flowSteps?.[lastStepPosition - 1]

  const currentPosition = session
    ? previous
      ? session.experienceMetadata.currentPosition - 1
      : session.experienceMetadata.currentPosition
    : 1

  const currentStepSlug = session
    ? flowSteps![currentPosition - 1]
    : flowSteps![0]

  // let lastCompletedStepSlug = session ? flowSteps![currentPosition - 2] : ""
  let lastCompletedStepSlug = ""
  if (session) {
    const completedSteps = session ? Object.keys(session?.steps) : []
    lastCompletedStepSlug = completedSteps.reduce((a, b) => {
      const indexA = flowSteps.indexOf(a)
      const indexB = flowSteps.indexOf(b)
      return indexA > indexB ? a : b
    })
  }

  const stepsList: IFlowStepsListItem[] = flowSteps.map((item, index) => {
    const schemaStep: IStepJSON | undefined = schema.steps.find(
      (x) => x.slug === item
    )
    return {
      position: index + 1,
      slug: item,
      friendlyName: schemaStep?.friendlyName || "",
    }
  })

  const metadata: IExperienceMetadata = {
    name: schema.name,
    currentFlow,
    lastStepSlug,
    currentStepSlug,
    currentPosition,
    lastCompletedStepSlug,
    stepsList,
  }

  return metadata
}
