/**
 * Pontos para ver:
 * atualizar json schema com alterações de interfaces
 * unificar start e next - proceed
 *  fazer update corretamente quando a pessoa passar um passo ja preenchido anteriormente (usar estado do currentStepSlug)
 * webhook
 * tracks (flows)
 * erros
 * capturedData request
 * devemos salvar os dados de webhook em um  passo especifico no storage??
 *
 * definir namespaces
 * matar meta do field - breaking change
 */

// --------
// representa o estado da sessão do usuário, campos concluidos, validade dos passos e etc
export interface IStepFormPayload {
  [key: string]: string
}

export interface IFlow {
  slug: string
  stepsSlugs: string[] // todo - convert to object when implementing globals
}

export type IDecisionHandlerStrategy = "local" | "remote"
interface IRemoteDecisionURLMap {
  [stepKey: string]: string
}
type IRemoteDecisionURL = IRemoteDecisionURLMap | string
export interface IRemoteDecisionConfig {
  url: IRemoteDecisionURL
  headers?: {
    [key: string]: string | boolean | number
  }
}

export interface IDecisionHandlerConfig {
  strategy: IDecisionHandlerStrategy
  triggers: string[] | "all"
  saveProcessedData: string[] | "all"
  // se tiver strategy remote e não tiver remoteConfig - retorna erro
  remoteConfig?: IRemoteDecisionConfig
}
//Representa a especificação do formulário geral dada pelo JSON
export interface IExperienceJSONSchema {
  "$schema-version"?: string
  "$experience-version"?: string
  name: string
  description: string
  business: string // todo remove
  decisionHandlerConfig?: IDecisionHandlerConfig
  flows: IFlow[]
  steps: IStepJSON[]
}
// Representa a especificação do campo dada pelo JSON do form
// Value preenchido no goBack e autofill

interface IFieldPropsConditional {
  conditional: string
  props: {
    [propKey: string]: any
  }
}

interface IFieldStyles {
  size: "full" | "half"
}

interface IFieldValidator {
  type: string
  properties?: Object
  context?: "client" | "server"
}
export interface IStepConfigField {
  slug: string
  "ui:widget": string
  "ui:props"?: {
    [propKey: string]: any
  }
  "ui:props-preset"?: string | [] // todo add multiple props presets
  "ui:props-conditional"?: IFieldPropsConditional[]
  "ui:styles"?: IFieldStyles
  conditional?: string
  validators?: IFieldValidator[]
  value?: any
}

// Representa a especificação do passo dada pelo json do form
export interface IStepJSON {
  slug: string
  type: "form" | "custom" // qualquer coisa alem desses dois vai ser tratado como custom
  friendlyName: string
  fields?: IStepConfigField[]
}
