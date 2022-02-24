const MINIMUM_PERCENTAGE_OF_COVERAGE = 35

module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
//   moduleNameMapper: {
//     "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
//       "jest-transform-stub",
//   },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
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
  testEnvironment: "jsdom" || "jest-environment-node",

  setupFiles: ["<rootDir>/__jest__/browserMocks.js"],
}
