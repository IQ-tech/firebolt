import {
  IExperienceConfig,
  IStepConfig,
  IStepFormPayload,
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

// representa os metadados da experincia atual (guardada no storage) do usuário,
// mudar experience metadata para ser computado a partir do JSON SCHEMA + session state
export interface IExperienceMetadata {
  name: string
  currentPosition: number
  lastStepSlug: string
  stepsList?: IFlowStepsListItem[]
  completedExperience: boolean
}

export interface IExperienceState {
  lastCompletedStepSlug: string // setado como o receiving no final da operação
  visualizingStepSlug: string // setado como o returning no final da operação
  currentFlow: string | "default"
  completedExperience: boolean
}

export interface IFlowStepsListItem {
  position: number
  slug: string
  friendlyName: string
}

// Representa um passo visitado por um determinado usuário e guardado no storage
export interface IStepSession {
  fields?: IStepFormPayload
  processedData?: {
    [stepKey: string]: any
  }
}

// Representa o mapa de steps visitados pelo usuário que vai dentro da sessão
export interface IFireboltSessionSteps {
  [stepSlug: string]: IStepSession
}
// Representa a sessão que é guardada no storage
export interface IFireboltSession {
  sessionId: string
  experienceState: IExperienceState
  steps: IFireboltSessionSteps
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
