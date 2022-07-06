import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

interface IProps {
  maxWords?: number 
  minWords?: number
}

type ErrorsType = typeof errorMessages

const wordsCount = createValidator<ErrorsType, IProps>(
  ({ value, action, properties = {} }) => {
    const valueWordsLength = value.split(" ").length
    const { minWords, maxWords } = properties // TODO: coloca min e max default nas properties???

    if(!!minWords && !!maxWords && minWords > maxWords) {
        return action.refuse("conflictBetweenMinAndMax")
    }

    if (!!maxWords && valueWordsLength > maxWords) {
      return action.refuse("maxWords")
    }

    if(!!minWords && valueWordsLength < minWords) {
        return action.refuse("minWords")
    }

    return action.approve()

  },
  errorMessages
)

export default wordsCount
