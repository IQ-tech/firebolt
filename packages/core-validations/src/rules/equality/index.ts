import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IProps {
  compareTo: string | number
}

type ErrorsType = typeof errorMessages

const equality = createValidationRule<ErrorsType, IProps>(
  ({ value, action, properties = {} }) => {
    if (value !== properties?.compareTo)
      return action.refuse("valueErrorConfirmation")

    return action.approve()
  },
  errorMessages
)

export default equality
