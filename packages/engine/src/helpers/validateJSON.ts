import EngineError from "../classes/EngineError"
import { IExperienceConfig } from "@iq-firebolt/entities"

function validateJSON(JSONExperienceDefinition: IExperienceConfig) {
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
