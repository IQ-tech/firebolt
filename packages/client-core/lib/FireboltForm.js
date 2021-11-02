// join navigator and renderer

class FireboltForm {
  constructor({}) {
    this.requestsMetadata = {};
  }

  start() {}

  nextStep() {}

  previousStep() {}

  debugStep() {}

  addRequestMetadataItem(key, data) {
    const currentReqMetadata = this.requestsMetadata;
    
    this.requestsMetadata = { ...currentReqMetadata, [key]: data };
  }

  removeRequestMetadataItem(key) {
    const currentReqMetadata = this.requestsMetadata;
    const currentReqMetaKeys = Object.keys(currentReqMetadata);
    const newMetadata = currentReqMetaKeys
      .filter((metaKey) => metaKey !== key)
      .map((itemKey) => currentReqMetaKeys[itemKey]);

    this.requestsMetadata = newMetadata;
  }
}

export default FireboltForm;
