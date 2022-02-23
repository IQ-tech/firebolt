/**
 * @param {import("../types").FormSource} formSource
 */
 export default function validateFormSource(formSource) {
  const { root, formName } = formSource
  const validateConfig = (config) => !!config && typeof config === "string"

  if (!validateConfig(root) || !validateConfig(formName)) {
    throw new TypeError(
      "Invalid formSource config object - check createFirebolt() arguments"
    )
  }
}
