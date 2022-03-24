import {} from "./types"

// objeto que representa as opções para criar uma instância da engine
export interface ICreateEngineOptions {
  formJSONSchema?: IFormJSONSchema
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
  getFormJSONSchema: (experienceSlug: string) => Promise<IFormJSONSchema>
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
 * representa o objeto com os dados de construção do passo, processado pela engine
 * (com props presets, resultado de webhook e posição na track atual)
 * */
export interface IProcessedStep extends IStepJSON {
  position: number
  webhookResult?: IFireboltWebhookResponse // check
}

/**
 * representa o objeto que é retornado ao consumer apos uma transição de passo do firebolt
 * */
export interface IStepTransitionReturn {
  step: IProcessedStep
  webhookResult: any // TODO
  capturedData: any // TODO
  formMetadata: IStepConfigFieldMeta
}

export interface IFireboltStepMeta {
  lastStep: string
  forms: IFireboltStepMetaForm[]
}

export interface IFireboltStepMetaForm {
  position: number
  slug: string
  friendlyName: string
}
