import rulesMap from "../rulesMap"

type RulesSlugs = keyof typeof rulesMap

type RulesMessagesMap = {
  [key in RulesSlugs]: {
    [errorId: string]: string
  }
}

interface IGeneralMessages {
  emptyRequiredField: string
}

export interface ILocaleConfig {
  code: string
  generalMessages: IGeneralMessages
  rulesMessages: RulesMessagesMap
}

