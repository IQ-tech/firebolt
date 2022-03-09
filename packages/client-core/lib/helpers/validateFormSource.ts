import { IFormAccess } from "../types"

export default function validateFormSource(formSource: IFormAccess) {
  const { root, formName } = formSource
  const validateConfig = (config: string) =>
    !!config && typeof config === "string"

  if (!validateConfig(root) || !validateConfig(formName)) {
    throw new TypeError(
      "Invalid formSource config object - check createFirebolt() arguments"
    )
  }
}
