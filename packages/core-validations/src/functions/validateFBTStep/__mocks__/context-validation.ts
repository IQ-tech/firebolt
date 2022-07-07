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
      }
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

export default fields
