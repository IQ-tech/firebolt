import errorMessages from "../../rules/stringLength/messages"
import { CreatorFunction, ValidationFunction, IAction } from "./types"

export default function createValidator<EM = {}, P = {}>(
  creatorFunction: CreatorFunction<EM, P>,
  defaultErrorsMap: EM
): ValidationFunction<EM, P> {
  return (givenValue, options) => {
    const { properties, errorsMap } = options
    const usedErrorsMap = errorsMap || defaultErrorsMap

    const action: IAction<keyof EM> = {
      approve: () => ({ isValid: true, givenValue }),
      refuse: (errorID) => {
        const safeErrorsMap = usedErrorsMap || ({} as any)
        const usedErrorMessage = safeErrorsMap[errorID] || ""

        return { isValid: false, givenValue, message: usedErrorMessage }
      },
    }

    return creatorFunction({ value: givenValue, action, properties })
  }
}
