export interface IFormAccess {
  /** Firebolt root endpoint */
  root: string
  /** Identifier to find form on endpoint */
  formName: string
}

// ----------- V2-todo ------------

export interface RemoteFormConfig {
  access: IFormAccess
  debug: boolean
  requestMetadata: any
}

export interface LocalFormConfig {
  schema: Object
  debug: boolean
}

// --------- end v2

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
    [key: string]: any
  }
}
export interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[]
}
export interface IFormEngineOptions {
  requestsMetadata?: Object
  debug?: boolean
  addons?: IAddonsConfig
  mockStep?: IStepData // provisional way to mock step response - remove on albus version
}
export interface IDefaultStep {
  data: {
    slug: string
    type: string
    friendlyName: string
    fields: IStepConfigField[]
  }
  position: number
  webhookResult: Object
}

export interface IFormResponseData {
  auth: string
  meta: IFormMetadata
  capturedData: {
    [key: string]: any
  }
  step: IFormStep
}

export interface IFormStep {
  data: IStepData
  webhookResult: Object
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

export interface IStepData {
  slug: string
  type: string
  friendlyName: string
  fields: IStepConfigField[]
}

export interface IStepConfigFieldUiProps {
  label?: string
  placeholder?: string
  [key: string]: any
}
export interface IStepConfigFieldValidator {
  type: string
}

export interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props": IStepConfigFieldUiProps
  validators: IStepConfigFieldValidator[]
  conditional?: string
  "ui:props-conditional"?: {
    conditional: string
    props: {
      [propKey: string]: any
    }
  }[]
  "ui:styles"?: {
    size: "full" | "half"
  }
  meta: Object
  component: string
  value?: any
}

export interface IRequestMetadata {
  extraRequestsMetaData?: Object
  [key: string]: any
}
