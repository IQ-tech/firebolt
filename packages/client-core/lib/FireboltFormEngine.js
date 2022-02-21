import APIService from "./services/API"

import getFormSession from "./helpers/session/getFormSession"
import createFormSession from "./helpers/session/createFormSession"
import { clearFormSession } from "./helpers/session/clearFormSession"
import getAutofillParam from "./helpers/getAutofillParam"
import getUrlParams from "./helpers/getUrlParams"
import processAutofillFields from "./helpers/processAutofillFields"
import applyAutofill from "./formatters/applyAutofill"

class FireboltFormEngine {
  // @ts-ignore
  constructor(formAccess, { requestMetadata = {}, debug } = {}) {
    this.requestsMetadata = requestMetadata
    this.formName = formAccess?.formName
    this.debug = debug
    this.APIService = new APIService({ formAccess, debug })
  }

  async start() {
    const autofillData = getAutofillParam(); // test if clear works correctly
    const urlParams = getUrlParams();

    if (autofillData) {
      //TODO to avaliate
      this.clearSession();
    }

    // @ts-ignore
    const sessionId = urlParams.session_id
    const formSessionKey = sessionId ? sessionId : getFormSession(this.formName);

    if (formSessionKey) {
      createFormSession(this.formName, formSessionKey);
    }
    const firstStepData = await this.APIService.getStartForm(formSessionKey)
    const stepDataWithAutofill = applyAutofill(firstStepData, autofillData)

    if (!formSessionKey) {
      createFormSession(this.formName, stepDataWithAutofill?.auth);
    }

    return stepDataWithAutofill
  }

  async nextStep(currentStepSlug, stepFieldsPayload) {
    const hasAutofill = getAutofillParam()

    const formSessionKey = getFormSession(this.formName)
    const nextStepData = await this.APIService.getNextStep(
      formSessionKey,
      currentStepSlug,
      {
        stepFieldsPayload,
        requestsMetadata: this.requestsMetadata,
      }
    )

    if (hasAutofill) {
      return processAutofillFields(nextStepData, hasAutofill)
    }

    return nextStepData
  }

  previousStep(currentStepSlug) {
    const formSessionKey = getFormSession(this.formName)
    return this.APIService.getPreviousStep(formSessionKey, currentStepSlug)
  }

  uploadFile(file) {
    const formSessionKey = getFormSession(this.formName)
    return this.APIService.upload(formSessionKey, file)
  }

  debugStep(stepSlug) {
    if (!this.debug) {
      throw new Error("debug step function only works with debug arg === true,")
    } else {
      return this.APIService.getDebugStep(stepSlug)
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
