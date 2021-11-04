import axios from "axios";
import {
  formatStepResponseData,
  formatReqPayload,
} from "../helpers/formatData";

class APIService {
  constructor({ formAccess, debug }) {
    const rootEndpoint = this._formatRoot(formAccess?.root);
    this.debug = debug;
    this.formName = formAccess.formName;

    this.endpoints = {
      root: rootEndpoint,
      base: `${rootEndpoint}/form/${formAccess?.formName}`,
    };
  }

  async getStartForm(sessionKey) {
    const userHasLocalSession = !!sessionKey;
    const headersConfig = userHasLocalSession
      ? { authorization: `Bearer ${sessionKey}` }
      : {};

    return await axios
      .get(this.endpoints.base, { headers: headersConfig })
      .then((res) => formatStepResponseData(res?.data?.formData)); // #V2-TODO
  }

  async getNextStep(
    sessionKey,
    currentStepSlug,
    { stepFieldsPayload, requestsMetadata }
  ) {
    const endpoint = `${this.endpoints.base}/next`;
    const dataToSend = formatReqPayload({
      stepSlug: currentStepSlug,
      stepFieldsPayload,
      metadata: requestsMetadata,
    });

    return await axios
      .post(endpoint, dataToSend, {
        headers: {
          authorization: `Bearer ${sessionKey}`,
        },
      })
      .then((res) => formatStepResponseData(res?.data?.formData)); // #V2-TODO
  }

  async getPreviousStep(sessionKey, currentStepSlug) {
    const endpoint = `${this.endpoints.base}/${currentStepSlug}/previous`;

    return await axios
      .get(endpoint, {
        headers: {
          authorization: `Bearer ${sessionKey}`,
        },
      })
      .then((res) => formatStepResponseData(res?.data?.formData)); // #V2-TODO
  }

  async getDebugStep(stepSlug) {
    const endpoint = `${this.endpoints.base}/debug/${this.formName}/${stepSlug}`;

    return await axios
      .get(endpoint)
      .then((res) => formatStepResponseData(res?.data?.formData));
  }

  _formatRoot(root) {
    const urlEndsWithSlash = root.endsWith("/");
    return urlEndsWithSlash ? root.slice(0, -1) : `${root}`;
  }
}

export default APIService;
