const sampleExperience = require("../sample-experience")

/**
 * @typedef {import("../../types").IExperienceJSONSchema} IExperienceJSONSchema
 */

/** @type {IExperienceJSONSchema} */
const sampleWithMissingStep = {
  ...sampleExperience,

  "flows": [
    {
      "slug": "default",
      "stepsSlugs": ["personal_data", "missing_step", "address", "bills"],
    },
  ],
}

module.exports = { sampleWithMissingStep }
