import { IEngineError } from "../interfaces/IEngine"

const EngineErrorConst = (params: IEngineError) => params

interface IErrorData {
  message: string
}

export type ErrorSlug =
  | "JSONNotFound"
  | "JSONWithoutDefaultPath"
  | "JSONWithoutSpecifiedFlow"
  | "resolverMissing"
  | "fieldValidation"

type ErrorsConfigMapType = {
  [key in ErrorSlug]: IErrorData
}

export const ErrorsConfigs: ErrorsConfigMapType = {
  "JSONNotFound": {
    message: "",
  },
  "JSONWithoutDefaultPath": {
    message: "",
  },
  "JSONWithoutSpecifiedFlow": {
    message: "",
  },
  // Resolver errors
  // ausente
  // quebra no meio
  // retornam algo invalido
  "resolverMissing": {
    message: "",
  },
  // Validation errors
  // campo está invalido de acordo com o firebolt validator
  // validação manual do decision callback
  "fieldValidation": {
    message: "",
  },
}
