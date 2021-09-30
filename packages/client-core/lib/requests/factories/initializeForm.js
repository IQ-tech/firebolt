import axios from "axios"
import { formatFormData } from "../../format-data"
import {
  createFormSession,
  getFormSession,
  clearFormSession,
} from "../../session"
import handleApiConnectionError from "../../helpers/handleAPIConnectionError"

/* import { stepState } from "./mock/first" */

/**
 * @typedef {import("../../types").Endpoints} Endpoints
 */

/**
 * Initial request that creates a form session or get an existing one using the localstorage
 * token
 * @param {Endpoints} endpoints
 */
export default function createInitializeForm(endpoints) {
  return async () => {
    const params = new URLSearchParams(window.location.search)
    const userHasAutofill = params.get("autofill")

    if (userHasAutofill) {
      clearFormSession()
    }

    const localSession = getFormSession()
    const userHasLocalSession = !!localSession && !!localSession.authKey
    const headersConfig = userHasLocalSession
      ? { authorization: `Bearer ${localSession.authKey}` }
      : {}

    const response = await axios
      .get(endpoints.base, { headers: headersConfig })
      .then((response) => response?.data)
      .catch(handleApiConnectionError)

    if (!userHasLocalSession) {
      createFormSession(response?.data?.auth)
    }

    return formatFormData(response?.data)
  }
}
