/**
 * This mock represents a simple firebolt experience with:
 *  - 3 different flows
 *  - 4 possible steps
 */

/**
 * @typedef {import("../types").IExperienceJSONSchema} IExperienceJSONSchema
 */

/** @type {IExperienceJSONSchema} */
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
          "slug": "full_name",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Nome completo",
            "placeholder": "Nome completo",
          },
          "validators": [{ "type": "required" }, { "type": "name" }],
        },
        {
          "slug": "email",
          "ui:widget": "Email",
          "ui:props": {
            "label": "Email",
            "placeholder": "contato@email.com",
          },
          "validators": [{ "type": "required" }],
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
          "validators": [{ "type": "required" }],
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
          "ui:props-preset": "br-cep",
          "ui:props": {
            "relatedFieldsSlugs": {
              "cityFieldSlug": "city",
              "stateFieldSlug": "state",
              "streetFieldSlug": "street_address",
              "additionalAddressFieldSlug": "additional_info",
              "neighborhoodFieldSlug": "neighborhood",
            },
          },
          "validators": [{ "type": "required" }, { "type": "cep" }],
        },
        {
          "slug": "street_address",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Endereço",
            "placeholder": "Ex.: Av Paulista",
          },
          "validators": [{ "type": "required" }],
        },
        {
          "slug": "street_number",
          "ui:widget": "Number",
          "ui:props": {
            "label": "Número",
          },
          "validators": [{ "type": "required" }],
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
          "ui:props": {
            "label": "Bairro",
            "placeholder": "Ex.: Centro",
          },
          "validators": [{ "type": "required" }, { "type": "nonNumeric" }],
        },
        {
          "slug": "city",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Cidade",
          },
          "validators": [{ "type": "required" }, { "type": "nonNumeric" }],
        },
        {
          "slug": "state",
          "ui:widget": "Select",
          "ui:props-preset": "br-states",
          "ui:props": {
            "label": "Estado",
          },
          "validators": [{ "type": "required" }],
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
          "validators": [{ "type": "required" }],
        },
      ],
    },
  ],
}

/** @type {IExperienceJSONSchema} */
const sampleWithWebhookConfig = {
  "webhookConfig": {
    "triggers": [
      {
        "slug": "personal_data",
        "saveProcessedData": true,
      },
      {
        "slug": "documents",
        "saveProcessedData": true,
      },
    ],
    "url": "https://teste.com.br",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
  },
  ...mock,
}

module.exports = mock

exports.sampleWithWebhookConfig = sampleWithWebhookConfig
