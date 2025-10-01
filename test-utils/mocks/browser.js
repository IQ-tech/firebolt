class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = String(value)
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()
Object.defineProperty(global, "localStorage", {
  value: new LocalStorageMock(),
  writable: true,
})
Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
  writable: true,
})

global.window = {
  atob: (base64) => Buffer.from(base64, "base64").toString(),
}

global.location = {
  search: {
    substring: () => "",
  },
}