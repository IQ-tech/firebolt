import APIService from "./services/API"

import getFormSession from "./helpers/session/getFormSession"
import createFormSession from "./helpers/session/createFormSession"
import { clearFormSession } from "./helpers/session/clearFormSession"
import getAutofillParam from "./helpers/getAutofillParam"
import getUrlParams from "./helpers/getUrlParams"
import processAutofillFields from "./helpers/processAutofillFields"

import applyAutofill from "./formatters/applyAutofill"
import applyPropsPresets from "./formatters/applyPropsPresets"

//mock
/* import nextStepWithPropsPresets from "./__mocks__/nextStepWithPropsPresets" */

class FireboltFormEngine {
  // @ts-ignore
  constructor(formAccess, { requestMetadata = {}, debug } = {}) {
    this.requestsMetadata = requestMetadata
    this.formName = formAccess?.formName
    this.debug = debug
    this.APIService = new APIService({ formAccess, debug })
  }

  async start() {
    const autofillData = getAutofillParam() // test if clear works correctly
    const urlParams = getUrlParams()

    if (autofillData) {
      //TODO to avaliate
      this.clearSession()
    }

    // @ts-ignore
    const sessionId = urlParams.session_id
    const formSessionKey = sessionId ? sessionId : getFormSession(this.formName)

    if (formSessionKey) {
      createFormSession(this.formName, formSessionKey)
    }
    const firstStepData = await this.APIService.getStartForm(formSessionKey)

    const formattedData = applyPropsPresets(
      applyAutofill(firstStepData, autofillData)
    )

    console.log(formattedData)

    if (!formSessionKey) {
      createFormSession(this.formName, formattedData?.auth)
    }

    return formattedData
  }

  async nextStep(currentStepSlug, stepFieldsPayload) {
    const autofillData = getAutofillParam()

    const formSessionKey = getFormSession(this.formName)
    const nextStepData = await this.APIService.getNextStep(
      formSessionKey,
      currentStepSlug,
      {
        stepFieldsPayload,
        requestsMetadata: this.requestsMetadata,
      }
    )

    const formattedData = applyPropsPresets(
      applyAutofill(nextStepData, autofillData)
    )

    return formattedData
  }

  previousStep(currentStepSlug) {
    const formSessionKey = getFormSession(this.formName)
    const previousData = this.APIService.getPreviousStep(
      formSessionKey,
      currentStepSlug
    )
    const formattedPreviousData = applyPropsPresets(previousData)
    return formattedPreviousData
  }

  uploadFile(file) {
    const formSessionKey = getFormSession(this.formName)
    return this.APIService.upload(formSessionKey, file)
  }

  debugStep(stepSlug) {
    if (!this.debug) {
      throw new Error("debug step function only works with debug arg === true,")
    } else {
      const stepToDebugData = this.APIService.getDebugStep(stepSlug)
      const formattedData = applyPropsPresets(stepToDebugData)
      return formattedData
    }
  }

  addRequestMetadataItem(key, data) {
    const currentReqMetadata = this.requestsMetadata
    this._modifyRequestMetadata({ ...currentReqMetadata, [key]: data })
  }

  removeRequestMetadataItem(key) {
    const currentReqMetadata = this.requestsMetadata
    const currentReqMetaKeys = Object.keys(currentReqMetadata)
    const newMetadata = currentReqMetaKeys
      .filter((metaKey) => metaKey !== key)
      .map((itemKey) => currentReqMetaKeys[itemKey])

    this._modifyRequestMetadata(newMetadata)
  }

  _modifyRequestMetadata(newPayload) {
    // v2-TODO sync with session storage
    this.requestsMetadata = newPayload
  }

  clearSession() {
    clearFormSession(this.formName)
  }
}

export default FireboltFormEngine
