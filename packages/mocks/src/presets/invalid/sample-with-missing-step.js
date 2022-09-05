const sampleExperience = require("../sample-experience")

/**
 * @typedef {import("@iq-firebolt/entities").IExperienceConfig} IExperienceConfig
 */

/** @type {IExperienceConfig} */
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
