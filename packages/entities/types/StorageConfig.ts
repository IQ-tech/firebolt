import { IStepFormPayload } from "."

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
