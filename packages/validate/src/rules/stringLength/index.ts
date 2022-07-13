import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

export interface IProps {
  minLength?: number
  maxLength?: number
  equals?: number
}

type ErrorsType = typeof errorMessages

const stringLength = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties = {} }) => {
    const valueCharLength = value.split("").length
    const { minLength, maxLength, equals } = properties

    if (!!minLength && valueCharLength < minLength) {
      return action.reprove("lessThanMin")
    }

    if (!!maxLength && valueCharLength > maxLength) {
      return action.reprove("greaterThanMax")
    }

    if (!!equals) {
      if (valueCharLength > equals) {
        return action.reprove("shouldEquals")
      } else if (valueCharLength < equals) {
        return action.reprove("shouldEquals")
      } else {
        return action.approve()
      }
    }

    return action.approve()
  },
  errorMessages
)

export default stringLength
