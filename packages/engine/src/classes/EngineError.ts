import { IEngineError, IStepTransitionError } from "../interfaces/IEngine"
import { ErrorsConfigs } from "../constants/errors"
import { InvalidField } from "@iq-firebolt/validators"
class EngineError implements IStepTransitionError {
  public id: keyof typeof ErrorsConfigs
  public detail: string
  public message: string
  public invalidFields?: InvalidField[]

  constructor(
    errorId: keyof typeof ErrorsConfigs,
    detail = "",
    { invalidFields }: { invalidFields?: InvalidField[] } = {}
  ) {
    this.detail = detail
    this.id = errorId
    this.message = ErrorsConfigs[errorId]?.message
    this.invalidFields = invalidFields
  }
}

export default EngineError
