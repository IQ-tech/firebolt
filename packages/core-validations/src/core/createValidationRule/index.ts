import { CreatorFunction } from "./types"
import {
  IValidationValueResult,
  IValidationFunctionOptions,
  GenericValidationFunc,
} from "../../types"
import { actionFactory } from "./helpers"

export default function createValidationRule<EM = {}, P = {}>(
  creatorFunction: CreatorFunction<EM, P>,
  defaultErrorsMap: EM
): GenericValidationFunc<EM, P> {
  return (
    givenValue: any,
    options?: IValidationFunctionOptions<EM, P>
  ): IValidationValueResult => {
    const properties = options?.properties
    const customErrorsMap = options?.errorsMap || {}
    const safeDefaultErrorsMap = defaultErrorsMap || {}
    const usedErrorsMap = { ...safeDefaultErrorsMap, ...customErrorsMap }

    const action = actionFactory<keyof EM>({
      givenValue,
      errorsMap: usedErrorsMap,
      properties,
    })

    return creatorFunction({ value: givenValue, action: action, properties })
  }
}
