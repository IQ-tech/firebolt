import { validateFBTStep, ValidateFBTStepResult } from "@iq-firebolt/validators"
import { IStepJSON } from "../types"

export default function validateStep(
  formPayload = {},
  currentStepConfig: IStepJSON
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
