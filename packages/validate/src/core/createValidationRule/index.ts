import { CreatorFunction } from "./types"
import {
  IValidationValueResult,
  IValidationFunctionOptions,
  GenericValidationFunc,
  IGenericObject,
} from "../../types"
import { actionFactory } from "./helpers"

type U<EM> = EM extends EM ? EM : {}
export default function createValidationRule<
  P extends { [key: string]: any } | undefined = IGenericObject,
  EM = {}
>(
  creatorFunction: CreatorFunction<EM, P>,
  defaultErrorsMap: EM
): GenericValidationFunc<EM, P> {
  const validationFunction = (
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

    const validationResult = creatorFunction({
      value: givenValue,
      action: action,
      properties,
    })
    if (typeof validationResult?.isValid !== "boolean") {
      throw new Error(
        "bad implementation: validator function does not return an validation result ({isValid: boolean, givenValue?: any, message?: string}"
      )
    }

    return validationResult
  }

  validationFunction.freeze = (properties: P, errorsMap?: EM) => {
    return (givenValue: any) =>
      validationFunction(givenValue, { properties, errorsMap })
  }

  return validationFunction
}
