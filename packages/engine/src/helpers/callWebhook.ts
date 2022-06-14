import axios, { AxiosResponse } from "axios"
import { IFireboltSession, IExperienceDecision } from "../interfaces/IEngine"
import { IWebhookConfig, IWebhookTrigger } from "../types"

export default async function callWebhook(
  { url, headers }: IWebhookConfig,
  data: IFireboltSession
): Promise<IExperienceDecision> {
  //error handling
  const response = await axios.post(url, data, {
    headers: headers,
  })

  const responseData: IExperienceDecision = response.data

  return responseData

  //  {  -> T response, D payload request?
  //   data: T;
  //   status: number;
  //   statusText: string;
  //   headers: AxiosResponseHeaders;
  //   config: AxiosRequestConfig<D>;
  //   request?: any;
  //  }
}
