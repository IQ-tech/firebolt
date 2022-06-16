const mock = require("./sample-experience")

/**
 * @typedef {import("../types").IExperienceJSONSchema} IExperienceJSONSchema
 */


/** @returns {IExperienceJSONSchema} */
const sampleWithWebhookConfig = (saveDataToStorage = true) =>  ({
  "webhookConfig": {
    "triggers": [
      {
        "slug": "personal_data",
        "saveProcessedData": saveDataToStorage,
      },
      {
        "slug": "documents",
        "saveProcessedData": saveDataToStorage,
      },
    ],
    "url": "https://teste.com.br",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
  },
  ...mock,
})

module.exports = sampleWithWebhookConfig


