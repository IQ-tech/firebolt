// -------------------------
// API export interface import
// TODO: Check if already exists

// API VERSION

export interface IFireboltWebhookResponse {
  preventContinue: boolean
  errorSlugField?: string
  errorMessage?: string
  newTrackSlug?: string
  processedData?: any
}

export interface IFireboltStepRequest {
  slug: string
  fields: IFireboltStepRequestField[]
}

export interface IFireboltRequest {
  fields: IFireboltStepRequestField[]
  metadata: any
}
