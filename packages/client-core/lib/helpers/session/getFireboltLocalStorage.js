import { LOCALSTORE_KEY } from "../../constants";

export default function getFireboltLocalStorage() {
  const data = localStorage.getItem(LOCALSTORE_KEY) || "{}";
  return JSON.parse(data);
}
