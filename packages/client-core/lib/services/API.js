import axios from "axios";
import formatRequestData from "../helpers/formatRequestData";

class APIService {
  constructor({ formAccess, debug }) {
    const rootEndpoint = this._formatRoot(formAccess?.root);
    this.debug = debug;

    this.endpoints = {
      root: rootEndpoint,
      base: `${rootEndpoint}form/${formAccess?.formName}`,
    };
  }

  async getStartForm(sessionKey) {
    const userHasLocalSession = !!sessionKey;
    const headersConfig = userHasLocalSession
      ? { authorization: `Bearer ${sessionKey}` }
      : {};

    return await axios
      .get(this.endpoints.base, { headers: headersConfig })
      .then((response) => formatRequestData(response?.data?.data)) // #V2-TODO
      .catch((err) => {
        // treat api error
        console.log(err);
      });
  }

  async getNextStep() {}

  async getPreviousStep() {}

  async getDebugStep() {}

  _formatRoot(root) {
    const urlEndsWithSlash = root.endsWith("/");
    return urlEndsWithSlash ? root : `${root}/`;
  }
}

export default APIService;
