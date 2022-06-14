import axios, { AxiosResponse } from "axios"
import { IFireboltSession, IExperienceDecision } from "../interfaces/IEngine"
import { IWebhookConfig, IWebhookTrigger } from "../types"

export default async function callWebhook(
  { url, headers }: IWebhookConfig,
  data: IFireboltSession
): Promise<IExperienceDecision> {
  const response = await axios.post(url, data, {
    headers: headers,
  })
  const responseData: IExperienceDecision = response.data
  return responseData
}
