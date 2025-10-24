export interface IFormAccess {
  /** Firebolt root endpoint */
  root: string
  /** Firebolt api key */
  apiKey?: string
  /** Identifier to find form on endpoint */
  formName: string
}

export interface RemoteFormConfig {
  access: IFormAccess
  debug: boolean
  requestMetadata: Record<string, unknown>
}

export interface LocalFormConfig {
  schema: Record<string, unknown>
  debug: boolean
}

export interface IApiService {
  formAccess: IFormAccess
  debug?: boolean
}

export type GetPreviousStepRoute = (currentStep: string | number) => string

export type GetDebugStepRoute = (stepId: string | number) => string
export interface Endpoints {
  /** Route to start the form */
  base: string
  /** Route to proceed to next step */
  nextStep: string
  /** Return url to get previous step */
  getPreviousStepRoute: GetPreviousStepRoute
  /** return url to get previous step */
  getDebugStepRoute: GetDebugStepRoute
}
export interface IUrlParams {
  [key: string]: string
}

export interface IPropsPresetCollection {
  name: string
  presets: {
    [key: string]: unknown
  }
}
export interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[]
}

export interface WebhookResult<T = Record<string, unknown>> {
  preventContinue?: boolean
  errorSlugField?: string
  errorMessage?: string
  newTrackSlug?: string
  processedData?: T
  inputFieldErrors?: Array<{
    slug: string
    message: string
  }>
  [key: string]: unknown
}

export interface IFormEngineOptions {
  requestsMetadata?: Record<string, unknown>
  debug?: boolean
  addons?: IAddonsConfig
  enforceNewSession?: boolean
  mockStep?: IStepData
}
export interface IDefaultStep {
  data: IStepData
  position: number
  webhookResult: WebhookResult
}

export interface IFormResponseData {
  auth: string
  meta: IFormMetadata
  capturedData: {
    [key: string]: unknown
  }
  step: IFormStep
}

export interface IFormStep {
  data: IStepData
  webhookResult: WebhookResult
  position: number
}

export interface IFormStepBasicInfo {
  slug: string
  friendlyName: string
  position: number
}

export interface IFormMetadata {
  lastStep: string
  steps: IFormStepBasicInfo[]
}

export interface IStepData<T = Record<string, unknown>> {
  slug: string
  type: string
  friendlyName: string
  stepName: string
  fields: IStepConfigField[]
  extraInfo?: string
  position?: number
  webhookResult?: WebhookResult<T>
}

export interface IStepConfigFieldUiProps {
  label?: string
  sublabel?: string
  placeholder?: string
  htmlType?: string
  options?: {
    value: string
    label: string
  }[]
  [key: string]: unknown
}

export interface IStepConfigFieldValidator {
  type: string
  context?: 'server' | 'client'
  properties?: {
    [key: string]: unknown
  }
}

export interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props": IStepConfigFieldUiProps
  "ui:props-preset"?: string
  "ui:props-conditional"?: Array<{
    conditional: string
    props: {
      [propKey: string]: unknown
    }
  }>
  "ui:styles"?: {
    size: "full" | "half"
    grow?: "1" | "2" | "3"
  }
  validators: IStepConfigFieldValidator[]
  conditional?: string
  meta: Record<string, unknown>
  component: string
  value?: unknown
}

export interface IRequestMetadata {
  extraRequestsMetaData?: Record<string, unknown>
  [key: string]: unknown
}

export interface ICustomField {
  clearManuallySetError: () => void
  errorMessage: string
  fieldId: string
  fieldValidators: IStepConfigFieldValidator[]
  hasError: boolean
  inputRef: { current: HTMLElement | null }
  isOptional: boolean
  isRequired: boolean
  isValid: boolean
  label: string
  manuallySetFieldError: (message: string) => void
  meta: Record<string, unknown>
  modifyPayloadKeys: (newData?: Record<string, unknown>) => void
  onBlur: (value: string) => void
  onChange: (value: string) => void
  onFocus: () => void
  payload: Record<string, unknown>
  placeholder: string
  slug: string
  sublabel: string
  value: string
  options?: Array<{ label: string; value: string }>
  uploadLabels?: {
    button: string
    description: string
    sentButton: string
  }
}
