import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IRequiredIncluded {
  included: Array<string | number> | string
  contains?: string
}

interface IRequiredContains {
  included?: Array<string | number> | string
  contains: string
}

export type IProps = IRequiredIncluded | IRequiredContains

type ErrorsType = typeof errorMessages

const exclusion = createValidationRule<ErrorsType, IProps>(
  ({ value, action, properties }) => {
    const included = properties?.included
    const contains = properties?.contains

    if (included && included?.includes(value)) {
      return action.refuse("included")
    }
    if (contains && value?.includes(contains)) {
      return action.refuse("contains")
    }

    return action.approve()
  },
  errorMessages
)

export default exclusion
