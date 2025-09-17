import axios, { AxiosRequestConfig } from "axios"
import { formatStepResponseData, formatReqPayload } from "../helpers/formatData"
import { IApiService, IFormResponseData } from "../types"

const X_API_KEY = "x-api-key"

class APIService {
  debug?: boolean
  formName?: string
  endpoints?: { root: string; base: string; apiKey?: string }

  constructor({ formAccess, debug }: IApiService) {
    const rootEndpoint = this.formatRoot(formAccess?.root)
    this.debug = debug
    this.formName = formAccess?.formName

    this.endpoints = {
      root: rootEndpoint,
      base: `${rootEndpoint}/form/${formAccess?.formName}`,
      apiKey: formAccess?.apiKey,
    }
  }

  async getStartForm(
    sessionKey?: string,
    fireboltId?: string
  ): Promise<IFormResponseData> {
    const headers = {}
    if (fireboltId) {
      headers["x-firebolt-id"] = fireboltId
    }

    if (sessionKey) {
      headers["Authorization"] = `Bearer ${sessionKey}`
    }

    if (this.endpoints?.apiKey) {
      headers[X_API_KEY] = this.endpoints.apiKey
    }

    return await axios
      .get(this.endpoints.base, { headers })
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async getNextStep(
    sessionKey: string,
    currentStepSlug: string,
    { stepFieldsPayload, requestsMetadata }
  ) {
    const headers = {
      authorization: `Bearer ${sessionKey}`,
    }

    if (this.endpoints?.apiKey) {
      headers[X_API_KEY] = this.endpoints.apiKey
    }

    const endpoint = `${this.endpoints.base}/next`
    const dataToSend = formatReqPayload({
      stepSlug: currentStepSlug,
      stepFieldsPayload,
      metadata: requestsMetadata,
    })

    return await axios
      .post(endpoint, dataToSend, { headers })
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async getPreviousStep(sessionKey, currentStepSlug) {
    const headers = {
      authorization: `Bearer ${sessionKey}`,
    }
    if (this.endpoints?.apiKey) {
      headers[X_API_KEY] = this.endpoints.apiKey
    }

    const endpoint = `${this.endpoints.base}/${currentStepSlug}/previous`

    return await axios
      .get(endpoint, { headers })
      .then((res) => formatStepResponseData(res?.data?.formData)) // #V2-TODO
  }

  async getDebugStep(stepSlug) {
    const headers = {}
    if (this.endpoints?.apiKey) {
      headers[X_API_KEY] = this.endpoints.apiKey
    }

    const endpoint = `${this.endpoints.root}/debug/${this.formName}/${stepSlug}`

    return await axios
      .get(endpoint, { headers })
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async upload(sessionKey, file, fileName) {
    const headers = {
      Authorization: `Bearer ${sessionKey}`,
      "Content-Type": "multipart/form-data",
    }
    if (this.endpoints?.apiKey) {
      headers[X_API_KEY] = this.endpoints.apiKey
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("filename", fileName)
    const endpoint = `${this.endpoints.root}/upload`

    const config: AxiosRequestConfig = {
      method: "post",
      url: endpoint,
      headers,
      data: formData,
    }

    return await axios(config)
  }

  private formatRoot(root) {
    const urlEndsWithSlash = root.endsWith("/")
    return urlEndsWithSlash ? root.slice(0, -1) : `${root}`
  }
}

export default APIService
