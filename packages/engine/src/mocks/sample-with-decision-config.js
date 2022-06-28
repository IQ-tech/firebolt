const sampleExperience = require("./sample-experience")

/**
 * @typedef {import("../types").IExperienceJSONSchema} IExperienceJSONSchema
 */
/**
 * @typedef {import("../types").IDecisionHandlerConfig} IDecisionHandlerConfig
 */
/**
 * @typedef {import("../types").IRemoteDecisionConfig} IRemoteDecisionConfig
 */

/** @type {IRemoteDecisionConfig} */
const remoteConfigMock = {
  url: "https://teste.com.br",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ",
  },
}

/**
 * @param {IDecisionHandlerConfig} decisionConfig
 * @returns {IExperienceJSONSchema}
 * */
const mockWithDecisionConfig = ({
  strategy = "local",
  triggers = "all",
  saveProcessedData = "all",
  remoteConfig,
}) => {
  /** @type {IDecisionHandlerConfig} */
  const localConfig = {
    strategy: "local",
    triggers,
    saveProcessedData,
  }

  /** @type {IDecisionHandlerConfig} */
  const remoteDecisionConfig = {
    strategy: "remote",
    triggers,
    remoteConfig: remoteConfig || remoteConfigMock,
  }

  const chosenConfig = (() => {
    if (strategy === "remote") return remoteDecisionConfig
    else if (strategy === "local") return localConfig
  })()

  return {
    ...sampleExperience,
    ...(strategy ? { decisionHandlerConfig: chosenConfig } : {}),
  }
}

module.exports = mockWithDecisionConfig
