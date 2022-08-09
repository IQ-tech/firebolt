import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

export type IProps = {
  minValue: number
}

type ErrorsType = typeof errorMessages

const moreThan = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties }) => {
    const minValue = properties?.minValue

    if (typeof minValue !== 'number') {
      throw new TypeError("Validator Rule Error. Propertie moreThan must be a number")
    }

    if (Number(value) < minValue) return action.reprove("numberLess")
    return action.approve()
  },
  errorMessages
)

export default moreThan
