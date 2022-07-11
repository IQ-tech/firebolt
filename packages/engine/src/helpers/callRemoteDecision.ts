import axios, { AxiosRequestHeaders } from "axios"
import {
  IExperienceDecision,
  IExperienceDecisionPayload,
} from "../types"

export default function callRemoteDecision(
  url: string,
  headers: AxiosRequestHeaders = {},
  data: IExperienceDecisionPayload
): Promise<IExperienceDecision> {
  return axios
    .post(url, data, { headers: headers })
    .then(({ data }) => {
      return data as IExperienceDecision
    })
    .catch((err) => {
      const responseError: IExperienceDecision = {
        action: "blockProgression",
        options: {
          errors: JSON.stringify(err),
        },
      }
      return responseError
    })
}
