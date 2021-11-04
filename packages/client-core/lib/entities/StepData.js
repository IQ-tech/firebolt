function StepData({ slug, type, friendlyname, fields = [] }) {
  return {
    /** @type {string} */
    slug: slug,
    /** @type {string} */
    type: type,
    /** @type {string} */
    friendlyName: friendlyname, // # v2-todo change when change on api,
    /** @type {Array} */
    fields,
  };
}

export default StepData;
