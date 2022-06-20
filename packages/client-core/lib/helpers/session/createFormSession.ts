import { LOCALSTORE_KEY } from "../../constants";
import getFireboltLocalStorage from "./getFireboltLocalStorage";

export default function createFormSession(formName: string, authKey: string) {
  
  const fireboltLocalStorage = getFireboltLocalStorage();

  const sessionData = {
    ...fireboltLocalStorage,
    sessionKeys: {
      ...(fireboltLocalStorage?.sessionKeys || {}),
      [formName]: authKey,
    },
  };

  localStorage.setItem(LOCALSTORE_KEY, JSON.stringify(sessionData));
}
