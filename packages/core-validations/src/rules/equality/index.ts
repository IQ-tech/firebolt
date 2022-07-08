import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IEquality {
  compareTo: string | number
}

type ErrorsType = typeof errorMessages

const equality = createValidationRule<ErrorsType, IEquality>(
  ({ value, action, properties = {} }) => {
    if (value !== properties?.compareTo)
      return action.refuse("valueErrorConfirmation")

    return action.approve()
  },
  errorMessages
)

export default equality
