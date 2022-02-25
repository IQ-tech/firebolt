const jestBaseConfig = require("../../jest.base.config")

module.exports = {
  ...jestBaseConfig,
 
  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/__jest__/styleMock.js" },
  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
  setupFilesAfterEnv: ["<rootDir>/__jest__/setup.js"],
}
