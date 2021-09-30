import axios from "axios"
import { getFormSession } from "../../session"
import handleApiConnectionError from "../../helpers/handleAPIConnectionError"
import { formatFormData, formatSendStepData } from "../../format-data"

/**
 * @typedef {import("../../types").Endpoints} Endpoints
 */
/**
 * @param {Endpoints} endpoints
 */
export default function createProceedToNextStep(endpoints) {
  return async (currentStepId, stepFieldsData, metadata = {}) => {
    const localSession = getFormSession()
    const { authKey } = localSession

    const dataToSend = formatSendStepData(currentStepId, stepFieldsData, metadata)
    const response = await axios
      .post(endpoints.nextStep, dataToSend, {
        headers: {
          authorization: `Bearer ${authKey}`,
        },
      })
      .then((res) => res?.data)
      .catch(handleApiConnectionError)

    return formatFormData(response?.data)
  }
}
