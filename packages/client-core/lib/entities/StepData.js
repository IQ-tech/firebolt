function StepData({ id, slug, type, friendlyname }) {
  return {
    /** @type {number} */
    position: id,
    /** @type {string} */
    slug: slug,
    /** @type {string} */
    type: type,
    /** @type {string} */
    friendlyName: friendlyname, // # v2-todo change when change on api,
  };
}

export default StepData;
