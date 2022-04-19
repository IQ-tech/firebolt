import EngineError from "../classes/EngineError"
import { IExperienceJSONSchema } from "../types"

function validateJSON(JSONExperienceDefinition: IExperienceJSONSchema) {
  const defaultFlow = JSONExperienceDefinition?.flows?.find(
    (x) => x.slug === "default"
  )

  if (!defaultFlow) {
    throw new EngineError("JSONWithoutDefaultFlow")
  }

  if (!!defaultFlow && !defaultFlow.stepsSlugs.length) {
    throw new EngineError("flowWithoutSteps")
  }

  if (!JSONExperienceDefinition?.steps?.length) {
    throw new EngineError("stepListNotProvided")
  }
}

export default validateJSON
