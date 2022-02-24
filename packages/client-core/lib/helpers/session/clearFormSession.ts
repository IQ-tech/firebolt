import { LOCALSTORE_KEY } from "../../constants";
import getFireboltLocalStorage from "./getFireboltLocalStorage";

export function clearAllFormSessions(){
 localStorage?.removeItem(LOCALSTORE_KEY);
}

export function clearFormSession(formName) { // TODO: runs out of types so it doesn't break the CLIENT
  const fireboltLocalStorage = getFireboltLocalStorage();
  const sessions = fireboltLocalStorage?.sessionKeys || {};
  const filteredSessionsKeys = Object.keys(sessions)
    .filter((key) => key !== formName)
    .reduce((acc, itemKey) => ({ ...acc, [itemKey]: sessions[itemKey] }), {});

  localStorage.setItem(
    LOCALSTORE_KEY,
    JSON.stringify({
      ...fireboltLocalStorage,
      sessionKeys: filteredSessionsKeys,
    })
  );
}
