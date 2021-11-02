function FormMetadata({ laststep = Number(), steps = [] } = {}) {
  const formattedSteps = steps.map((step) => ({
    friendlyName: step?.friendlyname,
    position: step?.id,
  }));

  return {
    /** @type {number} */
    lastStep: laststep,
    steps: formattedSteps,
  };
}

export default FormMetadata;
