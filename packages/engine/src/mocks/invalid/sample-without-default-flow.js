const sampleExperience = require("../sample-experience")
/**
 * @typedef {import("../../types").IExperienceJSONSchema} IExperienceJSONSchema
 */

/** @type {IExperienceJSONSchema} */
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

/** @type {IExperienceJSONSchema} */
const defaultFlowWithoutSteps = {
  ...sampleExperience,
  "flows": [
    {
      "slug": "default",
      "stepsSlugs": [],
    },
  ],
}

/** @type {IExperienceJSONSchema} */
const experienceWithoutSteps = {
  ...sampleExperience,
  "steps": [],
}

module.exports = {
  sampleWithoutDefaultFlow,
  defaultFlowWithoutSteps,
  experienceWithoutSteps,
}
