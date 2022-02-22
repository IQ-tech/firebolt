module.exports = {
  setupFiles: ["./__jest__/browserMocks.js"],
  projects: ["<rootDir>/lib"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "**/index.{js,jsx,ts,tsx}",
    "!node_modules/*",
    "lib/**",
    "!lib/masks/**/*",
  ],

  coverageThreshold: {
    global: { statements: 20 },
  },
}
