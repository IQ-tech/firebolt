const MINIMUM_PERCENTAGE_OF_COVERAGE = 35

module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageThreshold: {
    global: {
      branches: MINIMUM_PERCENTAGE_OF_COVERAGE,
      functions: MINIMUM_PERCENTAGE_OF_COVERAGE,
      lines: MINIMUM_PERCENTAGE_OF_COVERAGE,
      statements: MINIMUM_PERCENTAGE_OF_COVERAGE,
    },
  },
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover",
    ["text-summary", { "skipFull": true }],
  ],

  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
}
