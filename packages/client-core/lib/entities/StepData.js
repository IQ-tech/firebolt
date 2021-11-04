function StepData({
  slug = String(),
  type = String(),
  friendlyName = String(),
  fields = [],
} = {}) {
  return {
    /** @type {string} */
    slug,
    /** @type {string} */
    type: type,
    /** @type {string} */
    friendlyName,
    /** @type {Array} */
    fields,
  };
}

export default StepData;
