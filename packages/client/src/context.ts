import { createContext } from "react";
import { IDefaultStep, IFormStep, IFormMetadata } from "@iq-firebolt/client-core";
import { IFieldsObject } from ".";

export interface ICreateContext {
    //states
    isFormLoading?: boolean
    formFlowHasBeenFinished?: boolean
    //data
    currentStep?: IDefaultStep
    stagedStep?: IFormStep
    formflowMetadata?: IFormMetadata
    capturedData?: any // TODO: any
    formEndPayload?: object
    lastVisitedStep?: object
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
  }

const FireboltContext = createContext<ICreateContext>({} as ICreateContext);

export default FireboltContext;
