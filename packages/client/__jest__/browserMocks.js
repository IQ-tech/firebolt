class LocalStorageMock {
  constructor() {
    this.store = {};
    this.length = 0;
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  key(i) {
    return Object.keys(this.store)[i];
  }
}

global.localStorage = new LocalStorageMock();
