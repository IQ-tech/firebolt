import axios from "axios";

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

    const response = await axios
      .get(this.endpoints.root, { headers: headersConfig })
      .then((response) => response?.data)
      .catch((err) => {
        console.log(err);
      });

    return response;
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
