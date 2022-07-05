import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

interface IProps {
  minLength?: number
  maxLength?: number
  equals?: number
}

type ErrorsType = typeof errorMessages

const stringLength = createValidator<ErrorsType, IProps>(
  ({ value, action, properties = {} }) => {
    const valueCharLength = value.split("").length
    const { minLength, maxLength, equals } = properties

    if (!!minLength && valueCharLength < minLength) {
      return action.refuse("tooBig")
    }

    if (!!maxLength && valueCharLength > maxLength) {
      return action.refuse("tooBig")
    }

    if (!!equals) {
      if (valueCharLength > equals) {
        return action.refuse("tooShort")
      } else if (valueCharLength < equals) {
        return action.refuse("tooShort")
      } else {
        return action.approve()
      }
    }

    return action.approve()
  },
  errorMessages
)

export default stringLength

const isFieldValid = stringLength("cebola", { properties: { maxLength: 3 }, errorsMap: en }).message
