function StepData({
  slug = String(),
  type = String(),
  friendlyname = String(),
  fields = [],
} = {}) {
  return {
    slug,
    type: type,
    friendlyName: friendlyname,
    fields,
  };
}

export default StepData;
