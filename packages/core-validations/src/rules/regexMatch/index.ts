import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

interface IRegexMatch {
  pattern: string
}

type ErrorsType = typeof errorMessages

const regexMatch = createValidationRule<ErrorsType, IRegexMatch>(
  ({ value, action, properties = {} }) => {
    const { pattern } = properties

    if (!pattern) throw new TypeError("Validator Rule Error. regexMatch: no regex pattern provided")

    const jsonRegExp = new RegExp(pattern)

    if (jsonRegExp.test(value)) return action.refuse("invalidField")

    return action.approve()
  },
  errorMessages
)

export default regexMatch
