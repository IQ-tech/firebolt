import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

export interface IWordsCount {
  maxWords?: number 
  minWords?: number
}

type ErrorsType = typeof errorMessages

const wordsCount = createValidator<ErrorsType, IWordsCount>(
  ({ value, action, properties = {} }) => {
    const valueWordsLength = value.split(" ").length
    const { minWords, maxWords } = properties 

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
