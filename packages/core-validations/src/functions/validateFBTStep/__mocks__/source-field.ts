import { IFieldConfig } from "@iq-firebolt/entities"

const correctFields: IFieldConfig[] = [
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
    "slug": "max_words",
    "required": true,
    "ui:widget": "Number",
  },
  {
    "slug": "tested_field",
    "required": true,
    "ui:widget": "Text",
    "validation": [
      {
        "rule": "core:maxWords",
        "properties": { "maxWords": "step.max_words" },
      },
    ],
  },
]

export default correctFields
