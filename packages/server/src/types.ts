/**
 * Pontos para ver:
 * webhook
 * tracks
 * erros
 * capturedData request
 */

export interface IEngineResolvers {
  // local json, resover function or remote json (used on client)
  getFormJSONSchema: (experienceSlug: string) => Promise<IFormJSONSchema>
  getSession: (sessionId?: string) => Promise<IFireboltSession | undefined>
  setSession: (fireboltStepData: IFireboltSession) => Promise<void>
}

// -------------------------
// API export interface import
// TODO: Check if already exists

export interface IStepTracks {
  slug: string
  steps: string[]
}

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

// --------

// representa o estado da sessão do usuário, campos concluidos, validade dos passos e etc

export interface IFormPayload {
  [key: string]: string
}

//Representa a especificação do formulário geral dada pelo JSON
export interface IFormJSONSchema {
  "$schema-version"?: string
  "$form-version"?: string
  name: string //todo - add to schema
  description: string //todo - add to schema
  business: string // todo - to deprecate
  webhook: IStepConfigWebhook
  tracks: IStepTracks[]
  steps: IStepJSON[]
}
// Representa a especificação do campo dada pelo JSON do form
// Value preenchido no goBack e autofill
export interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props": IStepConfigFieldUiProps
  validators: IStepConfigFieldValidator[]
  meta: IStepConfigFieldMeta
  component: string
  value?: any
}

// Representa a especificação do passo dada pelo json do form
export interface IStepJSON {
  slug: string
  type: string
  friendlyName: string
  fields?: IStepConfigField[]
}

// Representa o estado de um passo visitado por um usuário, se ele está completo ou
export interface IStepSession {
  slug: string
  fields?: IFormPayload
}

// Representa o mapa de steps visitados pelo usuário que vai dentro da sessão
export interface IFireboltSessionSteps {
  [stepSlug: string]: IStepSession
}
// Representa a sessão que é guardada no storage
export interface IFireboltSession {
  sessionId: string
  currentTrack: "default" | string
  formMetadata: IStepConfigFieldMeta
  steps: IFireboltSessionSteps
}
