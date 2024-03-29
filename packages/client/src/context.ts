import { createContext } from "react"
import {
  IDefaultStep,
  IFormStep,
  IFormMetadata,
} from "@iq-firebolt/client-core"
import { IFieldsObject, INextStepFunction } from "./types"

export interface IFireboltContext {
  //states
  isFormLoading?: boolean
  formFlowHasBeenFinished?: boolean
  lastSentPayload?: Object
  //data
  currentStep?: IDefaultStep
  stagedStep?: IFormStep
  formflowMetadata?: IFormMetadata
  capturedData?: { [key: string]: any }
  formEndPayload?: object
  lastVisitedStep?: IDefaultStep
  remoteErrors?: Array<IFieldsObject>
  theme?: object
  // methods
  goNextStep?: INextStepFunction
  goPreviousStep?(): Promise<void | object>
  commitStepChange?(): void
  addRequestsMetadata?: (key: string, data?: any) => void
  removeRequestsMetadata?: (key: string) => void
  getRequestsMetadata?: object
  uploadFile?: any
  clearSession?(): void
  clearRemoteFieldError(fieldSlug: string): void

  connectionError?: any
  beforeProceedPayload: boolean
  setBeforeProceedPayload(arg:boolean): void
  addFieldRemoteError(fieldSlug: string, errorMessage: string)
}

const FireboltContext = createContext<IFireboltContext>({} as IFireboltContext)

export default FireboltContext
