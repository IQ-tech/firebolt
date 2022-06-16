import axios from "axios"
import { IExperienceDecision, IExperienceDecisionPayload } from "../interfaces/IEngine"
import { IWebhookConfig } from "../types"

export default async function callWebhook(
  { url, headers }: IWebhookConfig,
  data: IExperienceDecisionPayload
): Promise<IExperienceDecision> {
  const response = await axios.post(url, data, {
    headers: headers,
  })
  const responseData: IExperienceDecision = response.data
  return responseData
}
