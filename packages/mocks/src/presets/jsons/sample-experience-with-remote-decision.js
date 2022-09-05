const mock = require("./sample-experience")

/**
 * @typedef {import("@iq-firebolt/entities").IExperienceConfig} IExperienceConfig
 */

/** @returns {IExperienceConfig} */
const sampleWithRemoteDecision = ({
  saveDataToStorage = "all",
  triggers = "all",
  url = "https://teste.com.br",
} = {}) => ({
  "decisionHandlerConfig": {
    "strategy": "remote",
    "triggers": triggers,
    "saveProcessedData": saveDataToStorage,
    "remoteConfig": {
      "url": url,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer ",
      },
    },
  },
  ...mock,
})

module.exports = sampleWithRemoteDecision
