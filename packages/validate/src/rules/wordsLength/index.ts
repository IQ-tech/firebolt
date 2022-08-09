import createValidationRule from "../../core/createValidationRule"
import defaultMessages from "./messages"

export interface IProps {
  maxWordLength?: number
  minWordLength?: number
  equalsWordLength?: number
}

type ErrorsType = typeof defaultMessages

const wordsLength = createValidationRule<IProps, ErrorsType>(
  ({ action, value, properties = {} }) => {
    const { maxWordLength, minWordLength, equalsWordLength } = properties
    const safeValue = value || ""
    if (!safeValue.length) return action.reprove("noWords")

    const words = safeValue.split(" ")

    for (let c = 0; c < words.length; c++) {
      const currentWord = words[c]

      if (!!maxWordLength && currentWord.length > maxWordLength) {
        return action.reprove("wordsExceedsMax")
      } else if (!!minWordLength && currentWord.length < minWordLength) {
        return action.reprove("wordsSmallerMin")
      } else if (
        !!equalsWordLength &&
        currentWord.length !== equalsWordLength
      ) {
        return action.reprove("equals")
      }
    }
    return action.approve()
  },
  defaultMessages
)

export default wordsLength
