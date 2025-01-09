import { FieldConfig, FormPayload } from "../../../types"

export default function processProperties(
  properties: { [key: string]: any },
  field: FieldConfig,
  formPayload: FormPayload
) {
  const referenceBase = {
    field: "field-value:",
    prop: "prop-value:",
  }

  const resolveValue = (value: string) => {
    if (typeof value !== "string") return value

    if (value.startsWith(referenceBase.field)) {
      const refFieldSlug = value.replace(referenceBase.field, "")
      const hasRefField = Object.keys(formPayload).includes(refFieldSlug)
      if (!hasRefField) return null
      return formPayload[refFieldSlug]
    }

    if (value.startsWith(referenceBase.prop)) {
      const refPropSlug = value.replace(referenceBase.prop, "")
      const referencedValue = field["ui:props"][refPropSlug]
      if (!referencedValue) return null
      return referencedValue
    }

    return value
  }

  return Object.entries(properties).reduce((acc, [key]) => {
    const resolvedValue = resolveValue(properties[key])
    if (resolvedValue === null) return { ...acc }
    return { ...acc, [key]: resolvedValue }
  }, {})
}
