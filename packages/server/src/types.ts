export interface IPropsPresetCollection {
  name: string
  presets: {
    [key: string]: any
  }
}

export interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[]
}

export interface IEngineHooks {
  onBeforeCallWebhook?: () => void
  onGetWebHookResponse?: () => void
  onProceedStep?: () => void
  onGoBackStep?: () => void
}

export interface IEngineResolvers {
  // local json, resover function or remote json (used on client)
  getFormJSONSchema: (experienceSlug: string) => Promise<IStepConfig>
  getSession: (sessionId?: string) => Promise<IFireboltStepData | undefined>
  setSession: (fireboltStepData: IFireboltStepData) => Promise<void>
}

export interface ICreateEngineOptions {
  slug: string
  sessionId?: string
  formJSONSchema?: any
  resolvers: IEngineResolvers
  hooks?: IEngineHooks
  addons?: any
}

// -------------------------
// API export interface import
// TODO: Check if already exists

export interface IStepTracks {
  slug: string
  steps: string[]
}

export interface ISteps {
  step: IStep
}

export interface IStep {
  id: number
  slug: string
  type: string
  friendlyname: string
  fields?: IStepConfigField[]
}

export interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props": IStepConfigFieldUiProps
  validators: IStepConfigFieldValidator[]
  meta: IStepConfigFieldMeta
  component: string
  value?: any
}

export interface IStepConfigFieldUiProps {
  label: string
  placeholder: string
}

export interface IStepConfigFieldValidator {
  type: string
}

export interface IStepConfigFieldMeta {}

export interface IStepConfig {
  "$schema-version"?: string
  "$form-version"?: string
  business: string
  webhook: IStepConfigWebhook
  tracks: IStepTracks[]
  steps: ISteps[]
}

export interface IFireboltStepData {
  step: {
    data: IStep
    position: number
    webhookResult?: IFireboltWebhookResponse
  }
  capturedData: any
  meta: IFireboltStepMeta
  sessionId: string
}

export interface IFireboltStepMeta {
  lastStep: string
  forms: IFireboltStepMetaForm[]
}

export interface IFireboltStepMetaForm {
  position: number
  slug: string
  friendlyname: string
}

export interface IFireboltWebhookResponse {
  preventContinue: boolean
  errorSlugField?: string
  errorMessage?: string
  newTrackSlug?: string
  processedData?: any
}

export interface IStepConfigWebhook {
  triggers: string[]
  url: string
  headers: IStepConfigWebhookHeader
}

export interface IStepConfigWebhookHeader {
  [prop: string]: any
}
