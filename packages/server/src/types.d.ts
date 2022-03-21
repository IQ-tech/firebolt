interface IPropsPresetCollection {
  name: string
  presets: {
    [key: string]: any
  }
};
interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[] 
}

interface IEngineHooks {
  onBeforeCallWebhook?: () => void;
  onGetWebHookResponse?: () => void;
  onProceedStep?: () => void;
  onGoBackStep?: () => void;
}

interface IEngineResolvers {
  // local json, resover function or remote json (used on client)
  getFormJSONSchema: (experienceSlug: string) => Promise<IStepConfig>
  getSession: (sessionId: string) => Promise<IFireboltStepData | undefined>
  setSession: (fireboltStepData: IFireboltStepData) => Promise<void>
}

interface ICreateEngineOptions {
  slug: srting
  formJSONSchema?: IStepConfig
  resolvers: IEngineResolvers
  hooks?: IEngineHooks
  addons?: any
}

// -------------------------
// API interface import
// TODO: Check if already exists

interface IStepTracks {
  slug: string
  steps: string[]
}

interface ISteps {
  step: IStep
}

interface IStep {
  id: number
  slug: string
  type: string
  friendlyname: string
  fields?: IStepConfigField[]
}

interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props": IStepConfigFieldUiProps
  validators: IStepConfigFieldValidator[]
  meta: IStepConfigFieldMeta
  component: string
  value?: any
}

interface IStepConfig {
  "$schema-version"?: string
  "$form-version"?: string
  business: string
  webhook: IStepConfigWebhook
  tracks: IStepTracks[]
  steps: ISteps[]
}

interface IFireboltStepData {
  step: {
    data: IStep
    position: number
    webhookResult?: IFireboltWebhookResponse
  }
  capturedData: any
  meta: IFireboltStepMeta
  sessionId: string
}

interface IFireboltStepMeta {
  lastStep: string
  forms: IFireboltStepMetaForm[]
}

interface IFireboltStepMetaForm {
  position: number
  slug: string
  friendlyname: string
}

interface IFireboltWebhookResponse {
  preventContinue: boolean
  errorSlugField?: string
  errorMessage?: string
  newTrackSlug?: string
  processedData?: any
}