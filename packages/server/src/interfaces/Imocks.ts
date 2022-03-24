// -------------------------
// API export interface import
// TODO: Check if already exists

// API VERSION
// export interface ISteps {
//   step: IStep
// }

export interface IStepConfigFieldUiProps {
  label: string
  placeholder: string
}

export interface IStepConfigFieldValidator {
  type: string
}

export interface IStepConfigFieldMeta {}

// API VERSION
// export interface IFireboltStepData {
//   step: {
//     data: IStep
//     position: number
//     webhookResult?: IFireboltWebhookResponse
//   }
//   capturedData: any
//   meta: IFireboltStepMeta
//   sessionId: string
//   currentTrack: string
// }

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

// API VERSION
// export interface IFireboltStepRequestField {
//   slug: string
//   value: string
// }

export interface IFireboltStepRequestField {
  [key: string]: string
}

// API VERSION
// export interface IFireboltRequest {
//   step: IFireboltStepRequest
//   metadata: any
// }

export interface IFireboltStepRequest {
  slug: string
  fields: IFireboltStepRequestField[]
}

export interface IFireboltRequest {
  fields: IFireboltStepRequestField[]
  metadata: any
}
