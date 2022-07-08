import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IInclusionA {
  included: Array<string | number> | string
  contains?: string
}

interface IInclusionB {
  included?: Array<string | number> | string
  contains: string
}

type IInclusion = IInclusionA | IInclusionB

type ErrorsType = typeof errorMessages

const inclusion = createValidationRule<ErrorsType, IInclusion>(
  ({ value, action, properties }) => {
    const included = properties?.included
    const contains = properties?.contains

    if (included && !included?.includes(value)) {
      return action.refuse("notIncluded")
    }
    if (contains && !value?.includes(contains)) {
      return action.refuse("notContains")
    }

    return action.approve()
  },
  errorMessages
)

export default inclusion
