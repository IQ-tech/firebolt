import axios from "axios";
import { formatFormData } from "../../format-data";
import  throwAPIConnectionError  from "../../helpers/throwAPIConnectionError";

/**
 * @typedef {import("../../types").Endpoints} Endpoints
 */

/**
 * given a step id, this request should return data from the specified step, only for
 * debug purposes
 * @param {Endpoints} endpoints
 * @param {boolean} debugMode
 */
export default function createDebugStep(endpoints, debugMode) {
  return async (stepId) => {
    if (!debugMode) {
      throw new Error(
        "debug step function only works with debugMode arg === true, check createFireboltForm args"
      );
    }
    const debugEndpoint = endpoints.getDebugStepRoute(stepId);

    const response = await axios
      .get(debugEndpoint)
      .then((res) => res?.data)
      .catch(() => {
        throwAPIConnectionError(debugEndpoint);
      });

    return formatFormData(response?.data);
  };
}
