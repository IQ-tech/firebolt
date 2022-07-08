import { ILocaleConfig } from "../types"

import {
  email,
  stringLength,
  repeatedChars,
  wordsCount,
  wordsLength,
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
  },
}

export default ptbrLocale
