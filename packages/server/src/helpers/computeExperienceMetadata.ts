import { IExperienceJSONSchema, IStepJSON } from "../types"
import {
  IFlowStepsListItem,
  IExperienceMetadata,
  IFireboltSession,
} from "../interfaces/IEngine"

import JSONConfig from "../JSONConfig"

/**
 * Each step transition, this function computes the experience metadata sent to the consumer,
 * this metadata includes:
 * - the current step position
 * - all possible steps of the current flow
 */

export default function computeExperienceMetadata(
  jsonConfig: JSONConfig,
  session?: IFireboltSession
) {
  const currentFlow = session?.experienceState.currentFlow ?? "default"
  const flowSteps = jsonConfig.getFlow(currentFlow).stepsSlugs

  if (!flowSteps) throw new Error("Flow not found") // TODO: ERRO - retornar erro flow não encontrado
  const lastStepSlug = flowSteps?.[flowSteps?.length - 1]
  const currentStepIndex = session
    ? flowSteps.indexOf(session?.experienceState.visualizingStepSlug)
    : 0
  const currentPosition = currentStepIndex + 1

  const stepsList: IFlowStepsListItem[] = flowSteps.map((item, index) => {
    const schemaStep: IStepJSON | undefined = jsonConfig.getStepDefinition(item)
    return {
      position: index + 1,
      slug: item,
      friendlyName: schemaStep?.friendlyName || "",
    }
  })

  const metadata: IExperienceMetadata = {
    name: jsonConfig.name,
    lastStepSlug,
    currentPosition,
    stepsList,
    completedExperience: session?.experienceState.completedExperience || false,
  }

  return metadata
}
