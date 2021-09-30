import { LOCALSTORE_KEY } from "./constants"

/**
 * @param {string} authKey - auth key to retrieve an incomplete form from the api
 */
export function createFormSession(authKey) {
  const savedOnDate = new Date()
  const savedOnDateISO = savedOnDate.toISOString()
  const sessionData = {
    authKey,
    savedOn: savedOnDateISO,
  }
  localStorage.setItem(LOCALSTORE_KEY, JSON.stringify(sessionData))
}

/** @typedef {(import("./types").SessionData} SessionData */
/**
 * @returns {(SessionData | undefined)}
 */
export function getFormSession() {
  const data = localStorage.getItem(LOCALSTORE_KEY)
  if (!data) return
  const parsedData = JSON.parse(data)

  return parsedData
}

export function clearFormSession() {
  localStorage.removeItem(LOCALSTORE_KEY)
}
