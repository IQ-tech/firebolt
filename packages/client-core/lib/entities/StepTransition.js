import FormMeta from "./FormMeta"

class StepTransition {
  constructor({
    isValidationError = false,
    currentStep = {},
    formMeta = new FormMeta(),
    formCapturedData = {},
    webhookResult = {},
    invalidFields = [],
  }) {
    this.currentStep = currentStep
    /** @type {FormMeta} */
    this.formMeta = formMeta
    this.formCapturedData = formCapturedData
    this.webhookResult = webhookResult
    this.isValidationError = isValidationError
    this.invalidFields = invalidFields
  }
}

export default StepTransition
