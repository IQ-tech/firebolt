import { LOCALSTORE_KEY } from "../../constants";
import getFireboltLocalStorage from "./getFireboltLocalStorage";

export default function getFormSession(formName: string): string | undefined {
  const fireboltLocalStorage = getFireboltLocalStorage();
  if (!Object.keys(fireboltLocalStorage).length) return;
  return fireboltLocalStorage?.sessionKeys?.[formName];
}
