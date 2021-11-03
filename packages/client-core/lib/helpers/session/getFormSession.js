import { LOCALSTORE_KEY } from "../../constants";

/** @returns {(string | undefined)} */
export default function getFormSession(formName) {
  const data = localStorage.getItem(LOCALSTORE_KEY);
  if (!data) return;
  const parsedData = JSON.parse(data);
  const formSessionKey = parsedData?.sessionKeys?.[formName];

  return formSessionKey;
}
