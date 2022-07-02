import { validateFBTStep, ValidateFBTStepResult } from "@iq-firebolt/validators"
import { IStepConfig } from "@iq-firebolt/entities"

export default function validateStep(
  formPayload = {},
  currentStepConfig: IStepConfig
): ValidateFBTStepResult {
  if (!currentStepConfig) {
    return { isValid: false, invalidFields: [] }
  }

  if (currentStepConfig.type !== "form") {
    formPayload[currentStepConfig.type] = "completed"
  }

  return validateFBTStep({
    stepFields: currentStepConfig.fields!,
    formPayload,
  })
}
