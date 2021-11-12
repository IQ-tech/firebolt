function FormMetadata({ lastStep = String(), forms = [] } = {}) {

  return {
    /** @type {number} */
    lastStep: lastStep,
    steps: forms,
  };
}

export default FormMetadata;
