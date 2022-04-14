import { IEngineError } from "../interfaces/IEngine"
import { ErrorsConfigs, ErrorSlug } from "../constants/errors"

class EngineError {
  private errorData: IEngineError
  private _details: string
  constructor(errorConstant: ErrorSlug, detail?: string) {
    this.errorData = ErrorsConfigs[errorConstant]
    this._details = detail || ""
  }

  get description() {
    return this.errorData.description
  }

  get id() {
    return this.errorData.id
  }

  get details() {
    return this._details
  }
}

export default EngineError
