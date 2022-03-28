import { IExperienceJSONSchema } from "../types"
import {
  IFlowStepsListItem,
  IExperienceMetadata,
  IFireboltSession,
} from "../interfaces/IEngine"

export default function computeExperienceMetadata(
  schema: IExperienceJSONSchema,
  session?: IFireboltSession
) {
  const currentFlow = session?.experienceMetadata?.currentFlow ?? "default"
  const flowSteps = schema.flows.find((x) => x.slug === currentFlow)?.stepsSlugs
  if (!flowSteps) throw new Error("Flow not found") // TODO: ERRO - retornar erro flow não encontrado
  const lastStepPosition = flowSteps?.length
  const lastStepSlug = flowSteps![lastStepPosition - 1]

  const currentStepSlug = session
    ? flowSteps![session.experienceMetadata.currentPosition - 1]
    : flowSteps![0]

  const currentPosition = session
    ? session.experienceMetadata.currentPosition
    : 1

  let lastCompletedStepSlug = session
    ? flowSteps![session.experienceMetadata.currentPosition - 2]
    : ""

  const stepsList: IFlowStepsListItem[] = flowSteps!.map((item, index) => {
    const schemaStep = schema!.steps.find((x) => x.slug === item)

    // if (session && currentStepSlug === item) {
    //   console.log("item")
    //   const filledFieldsKeys = Object.keys(session.steps)
    //   schemaStep?.fields?.forEach((field) => {
    //     if (filledFieldsKeys.includes(field.slug)) lastCompletedStepSlug = item
    //   })
    // }

    return {
      position: index + 1,
      slug: item,
      friendlyName: schemaStep!.friendlyName,
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
