const path = require("path")
const pathPackageJson = path.resolve("package.json")
const packageJson = require(pathPackageJson)

const MINIMUM_PERCENTAGE_OF_COVERAGE = 35

module.exports = {
  name: packageJson.name,
  displayName: packageJson.name,
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
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
}
