import { LOCALSTORE_KEY } from "../../constants";

/**
 * @param {string} authKey - auth key to retrieve an incomplete form from the api
 */
export default function createFormSession(formName, authKey) {
  const sessionData = {
    sessionKeys: {
      [formName]: authKey,
    },
  };
  localStorage.setItem(LOCALSTORE_KEY, JSON.stringify(sessionData));
}
