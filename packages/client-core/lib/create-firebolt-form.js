import { getEndpoints } from "./format-data"
import validateFormSource from "./helpers/validateFormSource"
import {
  createInitializeForm,
  createGoPreviousStep,
  createProceedToNextStep,
  createDebugStep,
} from "./requests"

/**
 * @param {import("./types").FormSource} formSource
 * @param {boolean} debugMode - should use debug mode (turn on only on development environmets)
 */
export function createFireboltForm(formSource, debugMode) {
  validateFormSource(formSource)
  const endpoints = getEndpoints(formSource)

  return {
    endpoints,
    // methods
    start: createInitializeForm(endpoints),
    nextStep: createProceedToNextStep(endpoints),
    previousStep: createGoPreviousStep(endpoints),
    debugStep: createDebugStep(endpoints, debugMode),
  }
}
