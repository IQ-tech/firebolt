import { CreatorFunction, ValidationFunctionOptions } from "./types"
import { IValidationValueResult } from "../../types"
import { actionFactory } from "./helpers"

export default function createValidator<EM = {}, P = {}>(
  creatorFunction: CreatorFunction<EM, P>,
  defaultErrorsMap: EM
) {
  return (
    givenValue: any,
    options?: ValidationFunctionOptions<EM, P>
  ): IValidationValueResult => {
    const properties = options?.properties
    const errorsMap = options?.errorsMap
    const usedErrorsMap = errorsMap || defaultErrorsMap || ({} as any)

    const action = actionFactory<keyof EM>({
      givenValue,
      errorsMap: usedErrorsMap,
      properties,
    })

    return creatorFunction({ value: givenValue, action: action, properties })
  }
}
