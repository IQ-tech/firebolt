import {
  IExperienceConfig,
  IStepConfig,
  IStepFormPayload,
  IFireboltSession,
  IExperienceMetadata,
} from "@iq-firebolt/entities"
import { IInvalidField } from "@iq-firebolt/validate/src"

// objeto que representa as opções para criar uma instância da engine
export interface ICreateEngineOptions {
  experienceJSONConfig?: IExperienceConfig
  experienceId: string // legacy business replacement
  resolvers: IEngineResolvers
  hooks?: IEngineHooks
  addons?: IAddonsConfig
  debug?: boolean
}

// objeto que representa as opções de addons, futuramente receber validadores customizados por aqui
export interface IAddonsConfig {
  uiPropsPresets?: IPropsPresetCollection[]
}

// Objeto que representa a coleção de props presets que podem ser usadas para preencher o json automaticamente
export interface IPropsPresetCollection {
  name: string
  presets: {
    [key: string]: any
  }
}

// objeto que representa a configuração dos resolvers, ou seja os pontos de acesso a dados
export interface IEngineResolvers {
  getExperienceJSON?: (experienceSlug: string) => Promise<IExperienceConfig>
  getSession: (sessionId?: string) => Promise<IFireboltSession | undefined>
  setSession: (fireboltStepData: IFireboltSession) => Promise<void>
}

// objeto que representa a configuração dos hooks, ou seja, funções que rodam em momentos especificos do formulário

export type IEngineOperations =
  | "start"
  | "proceed"
  | "goBack"
  | "debug"
  | "error"
export interface IOnStepTransition {
  operation: IEngineOperations
  payload?: IExperienceProceedPayload
}

export interface IEngineHooks {
  onBeforeCallWebhook?: () => void
  onGetWebHookResponse?: () => void
  onStartStepTransition?: (args: IOnStepTransition) => void
  onEndStepTransition?: (args: IOnStepTransition) => void
}

/**
 * representa o objeto que é retornado ao consumer após uma transição de passo do firebolt
 * */

export interface IStepTransitionReturn {
  sessionId: string
  error: IStepTransitionError | null
  step?: IStepConfig
  capturedData: any // TODO
  experienceMetadata: IExperienceMetadata | null
  processedData: any
}

export interface IStepTransitionError {
  id: string
  message: string
  detail: string
  invalidFields?: IInvalidField[]
}

// Representa a requisição do consumer para o firebolt transicionar um passo
export interface IExperienceProceedPayload {
  //todo - rename
  sessionId?: string
  fields?: IStepFormPayload
  additionalData?: any // todo, improve later
}

// decision handling
export interface IExperienceDecisionPayload {
  sessionData?: IFireboltSession
  receivingStepData: IExperienceProceedPayload
}
export interface IExperienceDecision {
  action: IExperienceDecisionAction
  options?: IExperienceDecisionOptions
}

export type IExperienceDecisionAction =
  | "changeFlow"
  | "blockProgression"
  | "proceed"

export interface IExperienceDecisionOptions {
  newFlow?: string
  processedData?: {
    [key: string]: any
  }
  errors?: any
  autofill?: {
    [key: string]: any
  }
}

export type IDecisionCreator = (
  action: IExperienceDecisionAction,
  options?: IExperienceDecisionOptions | undefined
) => void

export type IExperienceDecisionCallbackFunction = (
  decide: IDecisionCreator,
  decisionPayload: IExperienceDecisionPayload
) => void

export interface IEngineError {
  id: string
  description: string
}
