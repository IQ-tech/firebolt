const path = require("path")
const TJS = require("typescript-json-schema")
const fs = require("fs")


const settings = {
  required: true,
};
const compilerOptions = {
  strictNullChecks: true,
}

const program = TJS.getProgramFromFiles(
  [path.resolve("types-test.ts")],
  compilerOptions
)

console.log(path.resolve("types-test.ts"))

const schema = TJS.generateSchema(program, "IExperienceJSONSchema", settings);

fs.writeFileSync("test.json", schema)
