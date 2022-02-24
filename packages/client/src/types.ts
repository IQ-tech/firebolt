import { IFormAccess, IAddonsConfig } from "@iq-firebolt/client-core"

export interface IFireboltProvider {
  formAccess: IFormAccess
  debug?: boolean
  requestsMetadata?: Object
  stepQueryParam?: string
  children?: any
  withHistory?: boolean
  theme?: Object
  addons?: IAddonsConfig
}