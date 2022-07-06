import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

export interface IStringLength {
  minLength?: number
  maxLength?: number
  equals?: number
}

type ErrorsType = typeof errorMessages

const stringLength = createValidator<ErrorsType, IStringLength>(
  ({ value, action, properties = {} }) => {
    const valueCharLength = value.split("").length
    const { minLength, maxLength, equals } = properties

    if (!!minLength && valueCharLength < minLength) {
      return action.refuse("lessThanMin")
    }

    if (!!maxLength && valueCharLength > maxLength) {
      return action.refuse("greaterThanMax")
    }

    if (!!equals) {
      if (valueCharLength > equals) {
        return action.refuse("shouldEquals")
      } else if (valueCharLength < equals) {
        return action.refuse("shouldEquals")
      } else {
        return action.approve()
      }
    }

    return action.approve()
  },
  errorMessages
)

export default stringLength

