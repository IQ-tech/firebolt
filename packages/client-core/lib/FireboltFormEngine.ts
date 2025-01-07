import APIService from "./services/API"
import getFormSession from "./helpers/session/getFormSession"
import createFormSession from "./helpers/session/createFormSession"
import { clearFormSession } from "./helpers/session/clearFormSession"
import getAutofillParam from "./helpers/getAutofillParam"
import getUrlParams from "./helpers/getUrlParams"
import formatFormOutput from "./formatters"
import {
  IFormAccess,
  IAddonsConfig,
  IFormEngineOptions,
  IRequestMetadata,
  IFormResponseData,
  IFormStep,
  IStepData,
} from "./types"

class FireboltFormEngine {
  requestsMetadata?: IRequestMetadata
  formName: string
  debug?: boolean
  addons?: IAddonsConfig
  APIService: APIService
  enforceNewSession = false
  private mockStep?: IStepData

  constructor(
    formAccess: IFormAccess,
    {
      requestsMetadata = {},
      debug = false,
      addons = {},
      mockStep,
      enforceNewSession = false,
    }: IFormEngineOptions = {}
  ) {
    this.requestsMetadata = requestsMetadata
    this.formName = formAccess?.formName
    this.debug = debug
    this.addons = addons
    this.APIService = new APIService({ formAccess, debug })
    this.mockStep = mockStep
    this.enforceNewSession = enforceNewSession
  }

  private decideStepResponse(
    requestResponse: IFormResponseData
  ): IFormResponseData {
    if (!!this.debug && !!this.mockStep) {
      const safeResponse = requestResponse || ({} as IFormResponseData)
      const safeStep = safeResponse.step || ({} as IFormStep)
      return {
        ...safeResponse,
        step: {
          ...safeStep,
          data: this.mockStep,
        },
      }
    }

    return requestResponse
  }

  async start() {
    const autofillData = getAutofillParam() // test if clear works correctly
    const urlParams = getUrlParams()

    if (autofillData) {
      this.clearSession()
    }
    const sessionId = urlParams?.session_id

    const formSessionKey = (() => {
      if (this.enforceNewSession) return ""
      else if (sessionId) return sessionId
      else return getFormSession(this.formName)
    })()

    if (formSessionKey) {
      createFormSession(this.formName, formSessionKey)
    }
    const firstStepData = await this.APIService.getStartForm(formSessionKey)
    const usedStepData = this.decideStepResponse(firstStepData)
    const formattedData = formatFormOutput(usedStepData, {
      autofillData,
      addons: this.addons,
    })

    if (!formSessionKey) {
      createFormSession(this.formName, formattedData?.auth)
    }

    return formattedData
  }

  async nextStep(
    currentStepSlug: string,
    stepFieldsPayload: Object,
    { extraRequestsMetaData = {} } = {}
  ) {
    const autofillData = getAutofillParam()
    const formSessionKey = getFormSession(this.formName)
    const nextStepData = await this.APIService.getNextStep(
      formSessionKey,
      currentStepSlug,
      {
        stepFieldsPayload,
        requestsMetadata: {
          ...this.requestsMetadata,
          ...extraRequestsMetaData,
        },
      }
    )
    const usedStepData = this.decideStepResponse(nextStepData)
    return formatFormOutput(usedStepData, { addons: this.addons, autofillData })
  }

  async previousStep(currentStepSlug: string) {
    const formSessionKey = getFormSession(this.formName)
    const previousData = await this.APIService.getPreviousStep(
      formSessionKey,
      currentStepSlug
    )
    const usedStepData = this.decideStepResponse(previousData)
    return formatFormOutput(usedStepData, { addons: this.addons })
  }

  uploadFile(file: any, fileName: string) {
    // TODO: UPLOAD TYPE
    const formSessionKey = getFormSession(this.formName)
    return this.APIService.upload(formSessionKey, file, fileName)
  }

  async debugStep(stepSlug: string) {
    if (!this.debug) {
      throw new Error("debug step function only works with debug arg === true,")
    } else {
      const autofillData = getAutofillParam()
      const stepToDebugData = await this.APIService.getDebugStep(stepSlug)
      return formatFormOutput(stepToDebugData, { autofillData })
    }
  }

  addRequestMetadataItem(key: string, data: any) {
    const currentReqMetadata = this.requestsMetadata
    this.modifyRequestMetadata({ ...currentReqMetadata, [key]: data })
  }

  removeRequestMetadataItem(key: string) {
    const currentReqMetadata = this.requestsMetadata
    const currentReqMetaKeys = Object.keys(currentReqMetadata)
    const newMetadata = currentReqMetaKeys
      .filter((metaKey) => metaKey !== key)
      .map((itemKey) => currentReqMetaKeys[itemKey])

    this.modifyRequestMetadata(newMetadata)
  }

  private modifyRequestMetadata(newPayload) {
    // v2-TODO sync with session storage
    this.requestsMetadata = newPayload
  }

  clearSession() {
    clearFormSession(this.formName)
  }
}

export default FireboltFormEngine
