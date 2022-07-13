import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

export interface IProps {
  maxWords?: number
  minWords?: number
}

type ErrorsType = typeof errorMessages

const wordsCount = createValidationRule<IProps, ErrorsType>(
  ({ value, action, properties = {} }) => {
    const valueWordsLength = value.split(" ").length
    const { minWords, maxWords } = properties

    if (!!minWords && !!maxWords && minWords > maxWords) {
      return action.reprove("conflictBetweenMinAndMax")
    }

    if (!!maxWords && valueWordsLength > maxWords) {
      return action.reprove("maxWords")
    }

    if (!!minWords && valueWordsLength < minWords) {
      return action.reprove("minWords")
    }

    return action.approve()
  },
  errorMessages
)

export default wordsCount
