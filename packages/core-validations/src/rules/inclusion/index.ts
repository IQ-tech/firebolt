import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IInclusion {
  inclusionList: Array<string | number> | string
}

type ErrorsType = typeof errorMessages

const inclusion = createValidationRule<ErrorsType, IInclusion>(
  ({ value, action, properties = {} }) => {
    const { inclusionList } = properties
    if (!inclusionList?.includes(value)) return action.refuse("mustBeIncluded")


    return action.approve()
  },
  errorMessages
)

export default inclusion