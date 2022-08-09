import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IProps {
  compareTo: string | number
}

type ErrorsType = typeof errorMessages

const equality = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties = {} }) => {
    if (value !== properties?.compareTo)
      return action.reprove("valueErrorConfirmation")

    return action.approve()
  },
  errorMessages
)

export default equality
