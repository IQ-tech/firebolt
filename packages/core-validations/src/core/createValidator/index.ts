import { CreatorFunction, ValidationFunction, IAction } from "./types"
import parseErrorMessage from "../../utils/parseErrorMessage"

// todo if not value

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
        const parsedErrorMessage = parseErrorMessage(
          usedErrorMessage,
          givenValue,
          properties as any
        )

        return { isValid: false, givenValue, message: parsedErrorMessage }
      },
    }

    return creatorFunction({ value: givenValue, action, properties })
  }
}
