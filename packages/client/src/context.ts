import { createContext } from "react";
import { IDefaultStep, IFormStep, IFormMetadata } from "@iq-firebolt/client-core";
import { IFieldsObject } from ".";

export interface IFireboltContext {
  //states
  isFormLoading?: boolean
  formFlowHasBeenFinished?: boolean
  //data
  currentStep?: IDefaultStep
  stagedStep?: IFormStep
  formflowMetadata?: IFormMetadata
  capturedData?: any // TODO: any
  formEndPayload?: object
  lastVisitedStep?: IDefaultStep 
  remoteErrors?: Array<IFieldsObject>
  theme?: object 
  // methods
  goNextStep?: any // TODO: any
  goPreviousStep?: any // TODO: any
  commitStepChange?(): void
  addRequestsMetadata?: (key: string, data?: any) => void
  removeRequestsMetadata?: (key: string ) => void
  getRequestsMetadata?: object
  uploadFile?: any // TODO: any
  clearSession?(): void

  connectionError?: any // TODO: any
}

const FireboltContext = createContext<IFireboltContext>({} as IFireboltContext);

export default FireboltContext;
