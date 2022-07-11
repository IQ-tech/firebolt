import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

export type IProps = {
  maxValue: number
}

type ErrorsType = typeof errorMessages

const lessThan = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties }) => {
    const maxValue = properties?.maxValue

    if (typeof maxValue !== 'number') {
      throw new TypeError("Validator Rule Error. Propertie lessThan must be a number")
    }

    if (Number(value) < maxValue) return action.refuse("numberBigger")
    return action.approve()
  },
  errorMessages
)

export default lessThan
