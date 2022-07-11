import { ILocaleConfig } from "../types"

import {
  email,
  stringLength,
  repeatedChars,
  wordsCount,
  wordsLength,
  inclusion,
  exclusion,
  moreThan,
  lessThan,
} from "./rules"

const ptbrLocale: ILocaleConfig = {
  code: "pt-BR",
  generalMessages: {
    "emptyRequiredField": "Esse campo é obrigatório",
  },
  rulesMessages: {
    email,
    stringLength,
    repeatedChars,
    wordsCount,
    wordsLength,
    inclusion,
    exclusion,
    moreThan,
    lessThan,
  },
}

export default ptbrLocale
