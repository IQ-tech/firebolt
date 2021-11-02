function FormMetadata({ laststep = Number(), forms = [] } = {}) {
  const formattedSteps = forms.map((step) => ({
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
