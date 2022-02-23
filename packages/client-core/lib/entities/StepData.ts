function StepData({
  slug = String(),
  type = String(),
  friendlyname = String(),
  fields = [],
} = {}) {
  return {
    /** @type {string} */
    slug,
    /** @type {string} */
    type: type,
    /** @type {string} */
    friendlyName: friendlyname,
    /** @type {Array} */
    fields,
  };
}

export default StepData;
