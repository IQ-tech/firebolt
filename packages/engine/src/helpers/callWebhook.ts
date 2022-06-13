import axios, {AxiosResponse} from "axios"
import { IFireboltSession } from "../interfaces/IEngine"
import { IWebhookConfig } from "../types"



export default function callWebhook(webhookConfig: IWebhookConfig, data: IFireboltSession): Promise<AxiosResponse<any, any>>{
//error handling
 return axios.post(webhookConfig.url, data, {headers: webhookConfig.headers})

//  {  -> T response, D payload request?
//   data: T;
//   status: number;
//   statusText: string;
//   headers: AxiosResponseHeaders;
//   config: AxiosRequestConfig<D>;
//   request?: any;
//  }
}

const a = axios.post("sdf")