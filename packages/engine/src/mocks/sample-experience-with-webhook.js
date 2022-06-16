const mock = require("./sample-experience")

/**
 * @typedef {import("../types").IExperienceJSONSchema} IExperienceJSONSchema
 */


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

module.exports = sampleWithWebhookConfig


