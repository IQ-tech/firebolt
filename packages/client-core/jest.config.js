const jestBaseConfig = require("../../jest.base.config");

module.exports = {
  ...jestBaseConfig,

  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
  
  // Configuração para lidar com axios ESM
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
}
