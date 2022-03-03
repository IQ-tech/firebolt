import { IFormAccess, IAddonsConfig } from "@iq-firebolt/client-core"
import React from "react";

export interface IFireboltProvider {
  formAccess: IFormAccess
  debug?: boolean
  requestsMetadata?: Object
  stepQueryParam?: string
  children?: React.ReactElement
  withHistory?: boolean
  theme?: Object
  addons?: IAddonsConfig
}

export interface IFieldsObject {
  [key: string]: string
}

export interface IActionsChildData {
  isFormValid: boolean
  handleSubmit: (e: { preventDefault: () => void }) => void
  payload: IFieldsObject
  currentStep: number
}

export interface IRequestMetadata {
  extraRequestsMetaData?: Object
  [key: string]: any
}

export interface INextStepFunction {
  (
    stepFieldsPayload?: IFieldsObject,
    extraMetadata?: IRequestMetadata
  ): Promise<void | object>
}