import {
  IFormAccess,
  IAddonsConfig,
  IDefaultStep,
  IStepConfigField,
  IFormMetadata,
  IRequestMetadata,
  IStepData,
} from "@iq-firebolt/client-core"
import React from "react"

export interface IFireboltProvider {
  formAccess: IFormAccess
  debug?: boolean
  requestsMetadata?: Object
  stepQueryParam?: string
  children?: React.ReactElement
  withHistory?: boolean
  theme?: Object
  addons?: IAddonsConfig
  mockStep?: IStepData
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

export interface INextStepFunction {
  (
    stepFieldsPayload?: IFieldsObject,
    extraMetadata?: IRequestMetadata
  ): Promise<void | object>
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

export interface IWizardComponent {
  children: React.ReactElement
  fallback?: React.ReactElement
  onChangeStep?(arg0: IStepProps): void
  onConnectionError?(arg0?: object): void
  onFinishForm?(arg0?: object): void
  onBeforeChangeStep?(arg0?: Function, arg1?: IStepProps): void
  onBeforeProceed?(sendingStep, formPayload): void
}

export interface IUseFireboltForm {
  schema: Array<IStepConfigField>
  children?: Object[]
  onChange?: React.ChangeEvent<HTMLInputElement>
  onSubmit?(): void
  theme?: Object
  autoFill?: IFieldsObject
  remoteErrors?: Array<IFieldsObject>
  onGoBack?(): void
  classes: Object
  onFocusField?: Event
  addons?: IAddonsConfig
  clearRemoteFieldError?:(fieldSlug: string) => void
}

export interface IFormState {
  schema: Array<IStepConfigField>
  autoFill?: object
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

export interface IFormEndPayload {
  webhookResult?: object
  metadata?: IFormMetadata
  capturedData?: {
    [key: string]: any
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
  children?: Object[]
  onChange?: React.ChangeEvent<HTMLInputElement>
  onSubmit?(): void
  theme?: Object
  autoFill?: IFieldsObject
  remoteErrors?: Array<IFieldsObject>
  onGoBack?(): void
  onFocusField?: Event
  clearRemoteFieldError?:(fieldSlug: string) => void
}
