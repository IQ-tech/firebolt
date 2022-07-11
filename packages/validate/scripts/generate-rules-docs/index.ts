import rulesMap from "../../src/rulesMap"
import fs from "fs-extra"

import path from "path"
import rimraf from "rimraf"

import {
  getSchemaFromType,
  generateRuleIndex,
  generateMainIndex,
} from "./helpers"

function generateRulesDocs() {
  rimraf.sync("specs")
  const rulesKeys = Object.keys(rulesMap)
  const rulesDirectory = path.resolve("src/rules")
  const directories = fs
    .readdirSync(rulesDirectory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
  const directoriesKeys = directories.map((dir) => dir.name)
  const invalidDirName = rulesKeys.find(
    (ruleKey) => !directoriesKeys.includes(ruleKey)
  )

  if (invalidDirName) {
    throw new Error(
      `validation rule ${invalidDirName} does not have a corresponding folder at src/rules`
    )
  }

  rulesKeys.forEach((ruleKey) => {
    console.log(`start generating ${ruleKey} specs`)
    const filePath = path.resolve(`src/rules/${ruleKey}/index.ts`)
    const propsSchema = getSchemaFromType(filePath, "IProps")
    const messagesSchema = getSchemaFromType(filePath, "ErrorsType")
    const outputFolderPath = `specs/rules/${ruleKey}`

    if (propsSchema) {
      fs.outputFileSync(`${outputFolderPath}/properties.json`, propsSchema)
      console.log(`generated ${ruleKey} properties specs`)
    } else {
      console.warn(
        `validation rule: ${ruleKey} doesn't have properties map, or have invalid type name`
      )
    }

    if (messagesSchema) {
      fs.outputFileSync(`${outputFolderPath}/messages.json`, messagesSchema)
      console.log(`generated ${ruleKey} messages specs`)
    } else {
      throw new Error(
        `validation rule: ${ruleKey} must have a default errors map`
      )
    }

    generateRuleIndex(outputFolderPath)
  })

  generateMainIndex(rulesKeys)
}

generateRulesDocs()
