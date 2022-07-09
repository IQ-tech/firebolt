import { ILocaleConfig } from "../types"

import {
  email,
  stringLength,
  repeatedChars,
  wordsCount,
  wordsLength,
  inclusion,
  exclusion,
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
  },
}

export default ptbrLocale
