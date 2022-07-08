import * as TJS from "typescript-json-schema"
import fs from "fs-extra"

export function getSchemaFromType(
  filePath: string,
  typeName: string
): string | null {
  try {
    const program = TJS.getProgramFromFiles([filePath], {
      strictNullChecks: true,
    })

    const schema = TJS.generateSchema(program, typeName, {
      required: true,
      ignoreErrors: true,
    })

    return JSON.stringify(schema)
  } catch (err) {
    return null
  }
}

export function generateRuleIndex(directoryPath: string) {
  const template = `
const messages = require("./messages.json")
const properties = require("./properties.json")

module.exports = {
  messages,
  properties
}
  `

  fs.outputFileSync(`${directoryPath}/index.js`, template)
}

export function generateMainIndex(rulesKeys: string[]) {
  const exportFile = rulesKeys
    .map((ruleKey) => `exports.${ruleKey} = require("./${ruleKey}")`)
    .join("\n")

  fs.outputFileSync(`specs/rules/index.js`, exportFile)
}
