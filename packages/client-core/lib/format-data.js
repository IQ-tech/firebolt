import { StepTransition, FormMeta } from "./entities"

export function formatFormData(data = {}, previousStep = false) {
  const rootStepData = previousStep ? data?.previousStep : data?.nextstep
  const isValidationError = typeof data?.isValid === "boolean" && !data?.isValid

  const formMeta = new FormMeta({
    lastStep: data?.meta?.laststep,
    steps: data?.meta?.forms,
  })

  return new StepTransition({
    isValidationError, // v2-TODO - remove
    currentStep: rootStepData?.step,
    formMeta,
    formCapturedData: data?.capturedData,
    webhookResult: data?.webhookResult,
    invalidFields: data?.invalidFields,
  })
}

/**
 * @param {import("./types").FormSource} formSource
 * @returns {import("./types").Endpoints}
 */
export function getEndpoints(formSource) {
  const { root, formName } = formSource

  const rootWithSlash = (() => {
    const urlEndsWithSlash = root.endsWith("/")
    return urlEndsWithSlash ? root : `${root}/`
  })()

  const baseFormRoute = `${rootWithSlash}form/${formName}`

  return {
    base: baseFormRoute,
    nextStep: `${baseFormRoute}/next`,
    getPreviousStepRoute: (currentStep) =>
      `${baseFormRoute}/${currentStep}/previous`,
    getDebugStepRoute: (stepId) =>
      `${rootWithSlash}debug/${formName}/${stepId}`,
  }
}

export function formatSendStepData(formStepId, stepFieldsData, metadata = {}) {
  return JSON.stringify({
    step: {
      id: formStepId,
      fields: stepFieldsData,
    },
    metadata,
  })
}
