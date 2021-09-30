import axios from "axios"
import { getFormSession } from "../../session"
import throwAPIConnectionError from "../../helpers/throwAPIConnectionError"
import { formatFormData } from "../../format-data"

/**
 * @typedef {import("../../types").Endpoints} Endpoints
 */
/**
 * @param {Endpoints} endpoints
 */
export default function createGoPreviousStep(endpoints) {
  return async (currentStepId) => {
    const localSession = getFormSession()
    const { authKey } = localSession
    const endpoint = endpoints.getPreviousStepRoute(currentStepId)

    const response = await axios
      .get(endpoint, {
        headers: {
          authorization: `Bearer ${authKey}`,
        },
      })
      .then((res) => res?.data)
      .catch(() => {
        throwAPIConnectionError(endpoint)
      })

    return formatFormData(response?.data, true)
  }
}
