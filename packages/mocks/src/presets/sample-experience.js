/**
 * This mock represents a simple firebolt experience with:
 *  - 3 different flows
 *  - 4 possible steps
 */

/**
 * @typedef {import("@iq-firebolt/entities").IExperienceConfig} IExperienceConfig
 */

/** @type {IExperienceConfig} */
const mock = {
  "$schema-version": "1.0.0",
  "$experience-version": "0.0.1",
  "name": "sample",
  "description": "sample json for tests",
  "business": "sample",
  "flows": [
    {
      "slug": "default",
      "stepsSlugs": ["personal_data", "documents", "address", "bills"],
    },
    {
      "slug": "medium",
      "stepsSlugs": ["personal_data", "documents", "token"],
    },
    {
      "slug": "short",
      "stepsSlugs": ["personal_data", "token"],
    },
  ],
  "steps": [
    {
      "slug": "personal_data",
      "type": "form",
      "friendlyName": "Vamos começar",

      "fields": [
        {
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
        },
        {
          "slug": "email",
          "ui:widget": "Email",
          "ui:props": {
            "label": "Email",
            "placeholder": "contato@email.com",
          },
          "required": true,
          "validation": [{ "rule": "core:email" }],
        },
      ],
    },
    {
      "slug": "documents",
      "type": "form",
      "friendlyName": "Documentos",
      "fields": [
        {
          "slug": "brazil_id_number",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Número do documento",
          },
          "required": true,
        },
      ],
    },
    {
      "slug": "address",
      "type": "form",
      "friendlyName": "Endereço",
      "fields": [
        {
          "slug": "zipcode",
          "ui:widget": "CEP",
          "required": true,
          "ui:props-preset": "br-cep",
          "ui:props": {
            "relatedFieldsSlugs": {
              "cityFieldSlug": "city",
              "stateFieldSlug": "state",
              "streetFieldSlug": "street_address",
              "additionalAddressFieldSlug": "additional_info",
              "neighborhoodFieldSlug": "neighborhood",
            },
          }, // todo cep br-addons
        },
        {
          "slug": "street_address",
          "ui:widget": "Text",
          "required": true,
          "ui:props": {
            "label": "Endereço",
            "placeholder": "Ex.: Av Paulista",
          },
        },
        {
          "slug": "street_number",
          "ui:widget": "Number",
          "ui:props": {
            "label": "Número",
          },
          "required": true,
        },
        {
          "slug": "additional_info",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Complemento",
            "placeholder": "Ex.: Apto 25 bl C",
          },
        },
        {
          "slug": "neighborhood",
          "ui:widget": "Text",
          "required": true,
          "ui:props": {
            "label": "Bairro",
            "placeholder": "Ex.: Centro",
          }, // todo add nonNumeric to core, "not include number"
        },
        {
          "slug": "city",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Cidade",
          },
          "required": true,
          // todo add nonNumeric to core, no include number"
        },
        {
          "slug": "state",
          "ui:widget": "Select",
          "ui:props-preset": "br-states",
          "ui:props": {
            "label": "Estado",
          },
          "required": true
        },
      ],
    },
    {
      "slug": "bills",
      "type": "custom",
      "friendlyName": "Adicionar Contas",
      "fields": [],
    },
    {
      "slug": "token",
      "type": "form",
      "friendlyName": "Token",
      "fields": [
        {
          "slug": "received_token",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Token recebido",
          },
          "required": true
        },
      ],
    },
  ],
}

module.exports = mock
