import { LOCALSTORE_KEY } from "../../constants";

export function clearFormSession() {
  localStorage.removeItem(LOCALSTORE_KEY);
}

export function clearFormSession(formName) {
  const data = localStorage.getItem(LOCALSTORE_KEY) || {};
  const sessions = JSON.parse(data)?.sessionKeys || {};
  const filteredSessionsKeys = Object.keys(sessions)
    .filter((key) => key !== formName)
    .map((key) => sessions[key]);

  localStorage.setItem(
    LOCALSTORE_KEY,
    JSON.stringify({ ...data, sessionKeys: filteredSessionsKeys })
  );
}
