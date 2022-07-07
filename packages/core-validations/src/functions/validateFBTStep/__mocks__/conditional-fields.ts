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
          "maxLength": 10,
        },
      },
    ],
  },
  {
    "slug": "email",
    "required": "step.nickname === 'cebola123'",
    "ui:widget": "Text",
    "validation": [
      {
        "rule": "core:email",
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
    "validation": [
      { "rule": "core:wordsCount", "properties": { "minWords": 2 } },
    ],
  },
]

export default fields
