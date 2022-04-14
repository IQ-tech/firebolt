import { IEngineError } from "../interfaces/IEngine"

const EngineErrorConst = (params: IEngineError) => params

interface IErrorData {
  id: string
  description: string
}

export type ErrorSlug =
  | "JSON_NOT_FOUND"
  | "JSON_WITHOUT_DEFAULT_PATH"
  | "JSON_WITHOUT_SPECIFIED_FLOW"

type ErrorsConfigMapType = {
  [key in ErrorSlug]: IErrorData
}

export const ErrorsConfigs: ErrorsConfigMapType = {
  JSON_NOT_FOUND: {
    id: "JSONNotFound",
    description: "",
  },
  JSON_WITHOUT_DEFAULT_PATH: {
    id: "JSONWithouDefaultPath",
    description: "",
  },
  JSON_WITHOUT_SPECIFIED_FLOW: {
    id: "JSONWithoutSpecifiedFlow",
    description: "",
  },
}
