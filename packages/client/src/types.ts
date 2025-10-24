import {
  IFormAccess,
  IAddonsConfig,
  IDefaultStep,
  IStepConfigField,
  IFormMetadata,
  IRequestMetadata,
  IStepData,
  IFormStep,
} from "@iq-firebolt/client-core"
import { WebhookResult } from "@iq-firebolt/client-core/lib/types"
import React from "react"

// Utility types
export type ThemeConfig = Record<string, unknown>
export type FormPayload = Record<string, unknown>
export type ClassesConfig = Record<string, string>

export interface IFireboltProvider {
  formAccess: IFormAccess
  debug?: boolean
  requestsMetadata?: Record<string, unknown>
  stepQueryParam?: string
  children?: React.ReactElement
  withHistory?: boolean
  theme?: ThemeConfig
  addons?: IAddonsConfig
  mockStep?: IStepData
  enforceNewSession?: boolean
}

export interface IFieldsObject {
  [key: string]: string | number | boolean | null | undefined
}

export interface IActionsChildData {
  isFormValid: boolean
  handleSubmit: (e: { preventDefault: () => void }) => void
  payload: IFieldsObject
  currentStep: number
}

export interface INextStepFunction {
  (
    stepFieldsPayload?: IFieldsObject,
    extraMetadata?: IRequestMetadata
  ): Promise<void | Record<string, unknown>>
}

export interface IStepProps {
  [key: string]: IDefaultStep
}
export interface IWizardHook {
  onChangeStep?(arg0: IStepProps): void
  onConnectionError?(arg0?: object): void
  onFinishForm?(arg0?: object): void
  onBeforeChangeStep?(arg0?: Function, arg1?: IStepProps): void
  onBeforeProceed?(sendingStep, formPayload): void
}

export interface IWizardComponent extends IWizardHook {
  children: React.ReactElement | React.ReactElement[]
  fallback?: React.ReactElement
}

export interface IUseFireboltForm {
  schema: Array<IStepConfigField>
  children?: React.ReactElement[]
  onChange?: (formPayload: IFieldsObject) => void
  onSubmit?(): void
  theme?: ThemeConfig
  autoFill?: IFieldsObject
  remoteErrors?: Array<IFieldsObject>
  onGoBack?(): void
  classes: ClassesConfig
  onFocusField?: (field: IStepConfigField, formPayload?: FormPayload) => void
  onBlurField?: (
    field: IStepConfigField,
    value: string,
    formPayload?: FormPayload
  ) => void
  onChangeField?: (
    field: IStepConfigField,
    values: { value: unknown; previousValue: unknown },
    formPayload?: FormPayload
  ) => void
  addons?: IAddonsConfig
  clearRemoteFieldError?: (fieldSlug: string) => void
  orderFields?: Array<Record<string, unknown>>
}

export interface IFormState {
  schema: Array<IStepConfigField>
  autoFill?: IFieldsObject
  addons?: IAddonsConfig
  remoteErrors?: Array<IFieldsObject>
}

export interface IBrowserNavigation {
  withHistory?: boolean
  currentStep?: IDefaultStep
  formflowMetadata?: IFormMetadata
  goPreviousStep?(): void
  goNextStep?: INextStepFunction
  debug?: boolean
  stepQueryParam?: string
}

export interface IFormEndPayload<T = unknown> {
  webhookResult?: WebhookResult<T>
  metadata?: IFormMetadata
  capturedData?: {
    [key: string]: unknown
  }
}

export interface IFormActionsProps {
  formData: IActionsChildData
}

export interface IFireboltForm {
  submitBtnText?: string
  previousBtnText?: string
  customActionsChild?: React.FC<IFormActionsProps>
  className?: string
  addons?: IAddonsConfig
  schema: Array<IStepConfigField>
  children?: React.ReactElement[]
  onChange?: (formPayload: IFieldsObject) => void
  onSubmit?(): void
  theme?: ThemeConfig
  autoFill?: IFieldsObject
  remoteErrors?: Array<IFieldsObject>
  onGoBack?(): void
  onFocusField?: (field: IStepConfigField, formPayload?: FormPayload) => void
  onBlurField?: (
    field: IStepConfigField,
    value: string,
    formPayload?: FormPayload
  ) => void
  onChangeField?: (
    field: IStepConfigField,
    values: { value: unknown; previousValue: unknown },
    formPayload?: FormPayload
  ) => void
  clearRemoteFieldError?: (fieldSlug: string) => void
  orderFields?: Array<Record<string, unknown>>
}

export interface IFireboltStep<
  T extends Record<string, unknown> = Record<string, unknown>
> extends IStepData<T> {
  clearSession?(): void
  clearRemoteFieldError(fieldSlug: string): void
  goNextStep: INextStepFunction
  goPreviousStep?(): Promise<void | Record<string, unknown>>
  capturedData: Record<string, unknown>
  remoteErrors: Array<IFieldsObject>
  formflowMetadata: IFormMetadata
}
