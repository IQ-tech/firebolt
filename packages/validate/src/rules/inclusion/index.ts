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

export type IProps = IInclusionA | IInclusionB

type ErrorsType = typeof errorMessages

const inclusion = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties }) => {
    const included = properties?.included
    const contains = properties?.contains

    if (included && !included?.includes(value)) {
      return action.reprove("notIncluded")
    }
    if (contains && !value?.includes(contains)) {
      return action.reprove("notContains")
    }

    return action.approve()
  },
  errorMessages
)

export default inclusion
