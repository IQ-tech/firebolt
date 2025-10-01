const jestBaseConfig = require("../../jest.base.config");

module.exports = {
  ...jestBaseConfig,
  
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
  setupFilesAfterEnv: ["<rootDir>/__jest__/setup.js"],
  
  // Configuração para lidar com axios ESM
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
}
