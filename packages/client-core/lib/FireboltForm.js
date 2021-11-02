// join navigator and renderer

class FireboltForm {
  constructor({}) {
    this.requestsMetadata = {};
  }

  start() {}

  nextStep() {
    // 
  }

  previousStep() {}

  debugStep() {}

  addRequestMetadataItem(key, data) {
    const currentReqMetadata = this.requestsMetadata;
    this._modifyRequestMetadata({ ...currentReqMetadata, [key]: data });
  }

  removeRequestMetadataItem(key) {
    const currentReqMetadata = this.requestsMetadata;
    const currentReqMetaKeys = Object.keys(currentReqMetadata);
    const newMetadata = currentReqMetaKeys
      .filter((metaKey) => metaKey !== key)
      .map((itemKey) => currentReqMetaKeys[itemKey]);

    this._modifyRequestMetadata(newMetadata);
  }

  _modifyRequestMetadata(newPayload) {
    // v2-TODO sync with session storage
    this.requestsMetadata = newPayload;
  }
}

export default FireboltForm;
