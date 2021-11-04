function FormMetadata({ laststep = Number(), forms = [] } = {}) {


  return {
    /** @type {number} */
    lastStep: laststep,
    steps: forms,
  };
}

export default FormMetadata;
