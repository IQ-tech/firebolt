const sampleExperience = require("../sample-experience")
/**
 * @typedef {import("@iq-firebolt/entities").IExperienceConfig} IExperienceConfig
 */

/** @type {IExperienceConfig} */
const sampleWithoutDefaultFlow = {
  ...sampleExperience,
  "name": "flow-without-default-flow",
  "flows": [
    {
      "slug": "medium",
      "stepsSlugs": ["personal_data", "documents", "token"],
    },
    {
      "slug": "short",
      "stepsSlugs": ["personal_data", "token"],
    },
  ],
}

/** @type {IExperienceConfig} */
const defaultFlowWithoutSteps = {
  ...sampleExperience,
  "flows": [
    {
      "slug": "default",
      "stepsSlugs": [],
    },
  ],
}

/** @type {IExperienceConfig} */
const experienceWithoutSteps = {
  ...sampleExperience,
  "steps": [],
}

module.exports = {
  sampleWithoutDefaultFlow,
  defaultFlowWithoutSteps,
  experienceWithoutSteps,
}
