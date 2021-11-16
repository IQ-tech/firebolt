import APIService from "./services/API";

import getFormSession from "./helpers/session/getFormSession";
import createFormSession from "./helpers/session/createFormSession";
import { clearFormSession } from "./helpers/session/clearFormSession";
import getAutofillParam from "./helpers/getAutofillParam";

class FireboltForm {
  constructor(formAccess, { requestMetadata = {}, debug } = {}) {
    this.requestsMetadata = requestMetadata;
    this.formName = formAccess?.formName;
    this.debug = debug;
    this.APIService = new APIService({ formAccess, debug });
  }

  async start() {
    const hasAutofill = getAutofillParam(); // test if clear works correctly

    if (hasAutofill) {
      this.clearSession();
    }
    const formSessionKey = getFormSession(this.formName);
    const firstStepData = await this.APIService.getStartForm(formSessionKey);
    if (!formSessionKey) {
      createFormSession(this.formName, firstStepData?.auth);
    }
    return firstStepData;
  }

  nextStep(currentStepSlug, stepFieldsPayload) {
    const formSessionKey = getFormSession(this.formName);
    return this.APIService.getNextStep(formSessionKey, currentStepSlug, {
      stepFieldsPayload,
      requestsMetadata: this.requestsMetadata,
    });
  }

  previousStep(currentStepSlug) {
    const formSessionKey = getFormSession(this.formName);
    return this.APIService.getPreviousStep(formSessionKey, currentStepSlug);
  }

  uploadFile(file) {
    const formSessionKey = getFormSession(this.formName);
    return this.APIService.upload(formSessionKey, file);
  }

  debugStep(stepSlug) {
    if (!this.debug) {
      throw new Error(
        "debug step function only works with debug arg === true,"
      );
    } else {
      return this.APIService.getDebugStep(stepSlug);
    }
  }

  addRequestMetadataItem(key, data) {
    const currentReqMetadata = this.requestsMetadata;
    this._modifyRequestMetadata({ ...currentReqMetadata, [key]: data });
  }

  removeRequestMetadataItem(key) {
    const currentReqMetadata = this.requestsMetadata;
    const currentReqMetaKeys = Object.keys(currentReqMetadata);
    const newMetadata = currentReqMetaKeys
      .filter((metaKey) => metaKey !== key)
      .map((itemKey) => currentReqMetaKeys[itemKey]);

    this._modifyRequestMetadata(newMetadata);
  }

  _modifyRequestMetadata(newPayload) {
    // v2-TODO sync with session storage
    this.requestsMetadata = newPayload;
  }

  clearSession() {
    clearFormSession(this.formName);
  }
}

export default FireboltForm;
