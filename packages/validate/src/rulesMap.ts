import wordsLength from "./rules/wordsLength"
import wordsCount from "./rules/wordsCount"
import stringLength from "./rules/stringLength"
import repeatedChars from "./rules/repeatedChars"
import email from "./rules/email"
import inclusion from "./rules/inclusion"
import exclusion from "./rules/exclusion"


const rulesMap = {
  wordsLength,
  wordsCount,
  stringLength,
  repeatedChars,
  email, 
  inclusion,
  exclusion
}


export default rulesMap