import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IEquality {
  valueToConfirm: string | number | any
}

type ErrorsType = typeof errorMessages

const equality = createValidationRule<ErrorsType, IEquality>(
  ({ value, action, properties = {} }) => {
    const { valueToConfirm } = properties

    if (value !== valueToConfirm) return action.refuse("valueErrorConfirmation")

    return action.approve()
  },
  errorMessages
)

export default equality
