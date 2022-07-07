import { IFieldConfig } from "@iq-firebolt/entities"

const fields: IFieldConfig[] = [
  {
    "slug": "nickname",
    "required": true,
    "ui:widget": "Text",
    "validation": [
      {
        "rule": "core:stringLength",
        "properties": {
          "maxLength": 5,
        },
      },
    ],
  },
  {
    "slug": "email",
    "required": true,
    "ui:widget": "Text",
    "validation": [
      {
        "rule": "core:email",
        "context": "client",
      },
    ],
  },
  {
    "slug": "full_name",
    "required": true,
    "ui:widget": "Text",
    "validation": [
      {
        "rule": "core:stringLength",
        "properties": {
          "maxLength": 60,
        },
      },
      {
        "rule": "core:wordsCount",
        "properties": {
          "minWords": 2,
        },
      },
      {
        "rule": "core:repeatedChars",
        "properties": {
          "times": 3,
        },
      },
    ],
  },
  {
    "slug": "mothers_name",
    "ui:widget": "Text",
    "required": true,
    "validation": [
      {
        "rule": "core:wordsCount",
        "properties": { "minWords": 2 },
        "context": "server",
      },
    ],
  },
]

const payloadClient: Record<string, string> = {
  "gender": "male",
  "date_of_birth": "20/01/2000",
  "marital_status": "single",
  "nationality": "BR",
  "mothers_name": "", //required only on server
  "educational_level": "no education",
  "birth_region": "BR-AC",
  "main_phone": "(11) 91234-1234",
}

const payloadServer: Record<string, string> = {
  "gender": "male",
  "date_of_birth": "20/01/2000",
  "marital_status": "", //required only on client
  "nationality": "BR",
  "mothers_name": "cebola batata",
  "educational_level": "no education",
  "birth_region": "BR-AC",
  "main_phone": "(11) 91234-1234",
}

export default fields
