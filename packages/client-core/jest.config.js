const jestBaseConfig = require("../../jest.base.config");
const packageJson = require('./package');

module.exports = {
  ...jestBaseConfig,
  name: packageJson.name,
  displayName: packageJson.name,

  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
}
