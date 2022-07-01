const jsonSchema = require("@iq-firebolt/json-schema/form-schema.json")
const { compile } = require("json-schema-to-typescript")
const fs = require("fs")

compile(jsonSchema, "FireboltSchema").then((ts) => {
  fs.writeFileSync("types.ts", ts)
})
