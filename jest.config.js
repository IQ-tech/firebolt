// module.exports = {
//   projects: ["<rootDir>", "<rootDir>/packages/*/jest.config.js"],
//   //moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
// };

const base = require("./jest.base.config.js")

const Client = "<rootDir>/packages/client"
const ClientCore = "<rootDir>/packages/client-core"
const Validators = "<rootDir>/packages/validators"

module.exports = {
  ...base,
  roots: ["<rootDir>"],
  projects: [Client, ClientCore, Validators],
}
