import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IProps {
  pattern: string | object | any
  shouldMatch: boolean
}

type ErrorsType = typeof errorMessages

const regexMatch = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties = {} }) => {
    const { pattern, shouldMatch } = properties

    if (!pattern || typeof shouldMatch !== "boolean")
      throw new TypeError(
        "Validator Rule Error. regexMatch: no regex pattern provided"
      )

    const jsonRegExp =
      typeof pattern === "string" ? new RegExp(pattern) : pattern

    const regexResult = jsonRegExp.test(value)
    if (regexResult && shouldMatch) return action.approve()
    if (!regexResult && !shouldMatch) return action.approve()

    return action.reprove("invalidField")
  },
  errorMessages
)

export default regexMatch
