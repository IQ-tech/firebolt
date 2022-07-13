import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

export interface IProps {
  char?: string
  times?: number
  caseSensitive?: boolean
}

type ErrorsType = typeof errorMessages

const repeatedChars = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties = {} }) => {
    const { char, times, caseSensitive = true } = properties
    const useCaseSensitive = `${caseSensitive ? "" : "i"}`

    if (!!char && !!times) {
      const valid = new RegExp(char?.repeat(times), useCaseSensitive)
      if (valid.test(value)) {
        return action.reprove("certainRepeatedLetter")
      }
    }

    if (!char && !!times) {
      const numberOfRepetitions = `(.)\\1{${times},}`
      const valid = new RegExp(numberOfRepetitions, useCaseSensitive)
      if (valid.test(value)) {
        return action.reprove("repeatedLetters")
      }
    }

    return action.approve()
  },
  errorMessages
)

export default repeatedChars
