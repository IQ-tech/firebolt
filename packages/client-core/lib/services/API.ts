import axios, { AxiosRequestConfig } from "axios"
import { formatStepResponseData, formatReqPayload } from "../helpers/formatData"
import { IApiService, IFormResponseData } from "../types"

class APIService {
  debug?: boolean
  formName?: string
  endpoints?: { root: string; base: string }

  constructor({ formAccess, debug }: IApiService) {
    const rootEndpoint = this.formatRoot(formAccess?.root)
    this.debug = debug
    this.formName = formAccess?.formName

    this.endpoints = {
      root: rootEndpoint,
      base: `${rootEndpoint}/form/${formAccess?.formName}`,
    }
  }

  async getStartForm(sessionKey?: string): Promise<IFormResponseData> {
    const userHasLocalSession = !!sessionKey
    const headersConfig = userHasLocalSession
      ? { authorization: `Bearer ${sessionKey}` }
      : {}

    return await axios
      .get(this.endpoints.base, { headers: headersConfig })
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async getNextStep(
    sessionKey: string,
    currentStepSlug: string,
    { stepFieldsPayload, requestsMetadata }
  ) {
    const endpoint = `${this.endpoints.base}/next`
    const dataToSend = formatReqPayload({
      stepSlug: currentStepSlug,
      stepFieldsPayload,
      metadata: requestsMetadata,
    })

    return await axios
      .post(endpoint, dataToSend, {
        headers: {
          authorization: `Bearer ${sessionKey}`,
        },
      })
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async getPreviousStep(sessionKey, currentStepSlug) {
    const endpoint = `${this.endpoints.base}/${currentStepSlug}/previous`

    return await axios
      .get(endpoint, {
        headers: {
          authorization: `Bearer ${sessionKey}`,
        },
      })
      .then((res) => formatStepResponseData(res?.data?.formData)) // #V2-TODO
  }

  async getDebugStep(stepSlug) {
    const endpoint = `${this.endpoints.root}/debug/${this.formName}/${stepSlug}`

    return await axios
      .get(endpoint)
      .then((res) => formatStepResponseData(res?.data?.formData))
  }

  async upload(sessionKey, file, fileName) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("filename", fileName)
    const endpoint = `${this.endpoints.root}/upload`

    const config: AxiosRequestConfig = {
      method: "post",
      url: endpoint,
      headers: {
        Authorization: `Bearer ${sessionKey}`,
        "Content-Type": "multipart/form-data",
      },
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
