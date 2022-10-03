import { IFieldConfig } from "@iq-firebolt/entities"

interface IFactoryOptions {
  quantity?: number
  includes?: {
    ui: "widget"
  }
}

const fieldFactory = (): IFieldConfig[] => {
  // throw new Error("NOT IMPLEMENTED")

  var arr: any = [
    "slug",
    "ui:widget",
    "ui:props-preset",
    "ui:props",

    "ui:styles",
    "validators",
    "meta",
  ]

  var meuObj: any = new Object()

  for (let index = 0; index < arr.length; index++) {
    meuObj[arr[index]] = "Sintaxe de ponto"
  }

  return meuObj
}

export default fieldFactory

interface Tess {
  chave?: any
  valor?: any
}

export const newField = ({ chave, valor }: Tess): any => {
  const test: any = {
    "required": true,
    "slug": "full_name",
    "ui:widget": "Text",
    "ui:props": {
      "label": "Nome completo",
      "placeholder": "Nome completo",
    },
    "validation": [
      { "rule": "core:wordsCount", "properties": { "minWords": 2 } },
      {
        "rule": "core:wordsLength",
        "properties": { "minWordLength": 3 },
      },
    ],
  }
  test[chave] = valor
  return test
}
