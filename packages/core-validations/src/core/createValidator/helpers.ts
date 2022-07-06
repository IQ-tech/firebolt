import { IAction } from "./types"
import parseErrorMessage from "../../utils/parseErrorMessage"

interface IActionFactory {
  givenValue: any
  errorsMap: {
    [key: string]: any
  }
  properties?: {
    [key: string]: any
  }
}
export function actionFactory<T>({
  givenValue,
  errorsMap,
  properties,
}: IActionFactory): IAction<T> {
  return {
    approve: () => ({ isValid: true, givenValue, message: "" }),
    refuse: (errorID) => {
      const safeErrorId = String(errorID)
      const usedErrorMessage = errorsMap[safeErrorId] || ""
      if (!errorID) {
        throw new TypeError(`no error message to error id ${errorID}`)
      }
      const parsedErrorMessage = parseErrorMessage(
        usedErrorMessage,
        givenValue,
        properties as any
      )

      return { isValid: false, givenValue, message: parsedErrorMessage }
    },
  }
}
