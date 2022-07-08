import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IProps {
  pattern: string | object | any
}

type ErrorsType = typeof errorMessages

const regexMatch = createValidationRule<ErrorsType, IProps>(
  ({ value, action, properties = {} }) => {
    const { pattern } = properties

    if (!pattern)
      throw new TypeError(
        "Validator Rule Error. regexMatch: no regex pattern provided"
      )

    const jsonRegExp =
      typeof pattern === "string" ? new RegExp(pattern) : pattern

    if (jsonRegExp.test(value)) return action.approve()

    // if (jsonRegExp.test(value)) return action.refuse("invalidField")

    return action.approve()
  },
  errorMessages
)

export default regexMatch
