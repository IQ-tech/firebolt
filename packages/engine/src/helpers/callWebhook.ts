import axios, { AxiosResponse } from "axios"
import {
  IExperienceDecision,
  IExperienceDecisionPayload,
} from "../interfaces/IEngine"
import { IWebhookConfig } from "../types"

export default function callWebhook(
  { url, headers }: IWebhookConfig,
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
