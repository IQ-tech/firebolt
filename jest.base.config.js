const MINIMUM_PERCENTAGE_OF_COVERAGE = 35

module.exports = {
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover",
    ["text-summary", { "skipFull": true }],
  ],
  coverageThreshold: {
    global: {
      statements: MINIMUM_PERCENTAGE_OF_COVERAGE,
      branches: MINIMUM_PERCENTAGE_OF_COVERAGE,
      functions: MINIMUM_PERCENTAGE_OF_COVERAGE,
      lines: MINIMUM_PERCENTAGE_OF_COVERAGE,
    },
  },

  // TODO: jest-transform-stub ????
}
