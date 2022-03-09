const jestBaseConfig = require("../../jest.base.config")

module.exports = {
  ...jestBaseConfig,
  
  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
  setupFilesAfterEnv: ["<rootDir>/__jest__/setup.js"],
}
