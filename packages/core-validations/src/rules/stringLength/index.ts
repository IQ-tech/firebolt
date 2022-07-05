import createValidator from "../../core/createValidator"
import { errors, ErrorsType } from "./messages"

interface IProps {
  minLength?: number
  maxLength?: number
  equals?: number
}

const stringLength = createValidator<ErrorsType, IProps>(
  ({ value, action, errors, properties = {} }) => {
    const valueCharLength = value.split("").length
    const { minLength, maxLength, equals } = properties

    if (!!minLength && valueCharLength < minLength) {
      return action.refuse(errors.tooShort)
    }

    if (!!maxLength && valueCharLength > maxLength) {
      return action.refuse(errors.tooBig)
    }

    if (!!equals) {
      if (valueCharLength > equals) {
        return action.refuse(errors.tooBig)
      } else if (valueCharLength < equals) {
        return action.refuse(errors.tooShort)
      } else {
        return action.approve()
      }
    }

    return action.approve()
  },
  errors
)

export default stringLength
