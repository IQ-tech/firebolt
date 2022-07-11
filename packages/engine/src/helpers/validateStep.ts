import {
  validateFBTStep,
  IStepValidationResult,
} from "@iq-firebolt/validate/src"

import { IStepConfig } from "@iq-firebolt/entities"

export default function validateStep(
  formPayload = {},
  currentStepConfig: IStepConfig
): IStepValidationResult {
  if (!currentStepConfig) {
    return { isValid: false, invalidFields: [] }
  }

  if (currentStepConfig.type !== "form") {
    formPayload[currentStepConfig.type] = "completed"
  }

  return validateFBTStep({
    stepConfig: currentStepConfig,
    formPayload,
  })
}
