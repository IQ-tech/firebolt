import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IEquality {
  compareTo: string | number
}

type ErrorsType = typeof errorMessages

const equality = createValidationRule<ErrorsType, IEquality>(
  ({ value, action, properties = {} }) => {
    const { compareTo } = properties

    if (value !== compareTo) return action.refuse("valueErrorConfirmation")

    return action.approve()
  },
  errorMessages
)

export default equality
