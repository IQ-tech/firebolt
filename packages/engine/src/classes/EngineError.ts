import { IStepTransitionError } from "../types"
import { ErrorsConfigs } from "../constants/errors"
import {IInvalidField} from "@iq-firebolt/validate/src"

class EngineError implements IStepTransitionError {
  public id: keyof typeof ErrorsConfigs
  public detail: string
  public message: string
  public invalidFields?: IInvalidField[]

  constructor(
    errorId: keyof typeof ErrorsConfigs,
    detail = "",
    { invalidFields }: { invalidFields?: IInvalidField[] } = {}
  ) {
    this.detail = detail
    this.id = errorId
    this.message = ErrorsConfigs[errorId]?.message
    this.invalidFields = invalidFields
  }
}

export default EngineError
