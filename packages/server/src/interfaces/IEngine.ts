import { IExperienceJSONSchema, IStepFormPayload, IStepJSON } from "../types"

// objeto que representa as opções para criar uma instância da engine
export interface ICreateEngineOptions {
  experienceJSONSchema?: IExperienceJSONSchema
  experienceId: string // legacy business replacement
  resolvers: IEngineResolvers
  hooks?: IEngineHooks
  addons?: IAddonsConfig
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
  // local json, resover function or remote json (used on client)
  getFormJSONSchema: (experienceSlug: string) => Promise<IExperienceJSONSchema>
  getSession: (sessionId?: string) => Promise<IFireboltSession | undefined>
  setSession: (fireboltStepData: IFireboltSession) => Promise<void>
}

// objeto que representa a configuração dos hooks, ou seja, funções que rodam em momentos especificos do formulário
export interface IEngineHooks {
  onBeforeCallWebhook?: () => void
  onGetWebHookResponse?: () => void
  onProceedStep?: () => void
  onGoBackStep?: () => void
}

/**
 * representa o objeto que é retornado ao consumer após uma transição de passo do firebolt
 * */
export interface IStepTransitionReturn {
  sessionId: string // FIXME: DUVIDA - SessionId deve estar nessa interface
  step: IStepJSON
  webhookResult: any /* IFireboltWebhookResponse // TODO */
  capturedData: any // TODO
  experienceMetadata: IExperienceMetadata
  errors: any
}

// representa os metadados da experincia atual (guardada no storage) do usuário,
export interface IExperienceMetadata {
  name: string
  currentFlow: string | "default"
  currentStepSlug: string
  lastCompletedStepSlug: string
  currentPosition: number
  lastStepSlug: string
  stepsList?: IFlowStepsListItem[]
}

export interface IFlowStepsListItem {
  position: number
  slug: string
  friendlyName: string
}

// Representa um passo visitado por um determinado usuário e guardado no storage
export interface IStepSession {
  fields?: IStepFormPayload
}

// Representa o mapa de steps visitados pelo usuário que vai dentro da sessão
export interface IFireboltSessionSteps {
  [stepSlug: string]: IStepSession
}
// Representa a sessão que é guardada no storage
export interface IFireboltSession {
  sessionId: string
  experienceMetadata: IExperienceMetadata
  steps: IFireboltSessionSteps
}

// Representa a requisição do consumer para o firebolt transicionar um passo
export interface IExperienceProceedPayload {
  sessionId?: string
  fields?: IStepFormPayload
}
