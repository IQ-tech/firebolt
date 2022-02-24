import { LOCALSTORE_KEY } from "../../constants";
import getFireboltLocalStorage from "./getFireboltLocalStorage";

export function clearAllFormSessions(): void {
 localStorage?.removeItem(LOCALSTORE_KEY);
}

export function clearFormSession(formName?: string) {
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
