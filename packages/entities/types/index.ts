export interface IStepFormPayload {
  [key: string]: string | number
}

export interface IStepForm {
  fields: IStepFormPayload
}

export * from "./ExperienceConfig"
export * from "./StorageConfig"
