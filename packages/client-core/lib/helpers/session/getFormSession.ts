import { LOCALSTORE_KEY } from "../../constants";
import getFireboltLocalStorage from "./getFireboltLocalStorage";

/** @returns {(string | undefined)} */
export default function getFormSession(formName) {
  const fireboltLocalStorage = getFireboltLocalStorage();
  if (!Object.keys(fireboltLocalStorage).length) return;
  return fireboltLocalStorage?.sessionKeys?.[formName];
}
