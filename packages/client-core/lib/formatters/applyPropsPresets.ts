import UIPropsPresets from "../constants/ui-props-presets"

export default function applyPropsPresets(stepData) {
  const fieldsFromAPI = stepData?.step?.data?.fields
  const mappedFields = fieldsFromAPI.map((field) => {
    const fieldPresetName = field?.["ui:props-preset"]
    const fieldProps = field?.["ui:props"]
    const fieldPresetProps = UIPropsPresets[fieldPresetName] || {}
    const fullfieldWithPropsPreset = {
      ...field,
      "ui:props": { ...fieldPresetProps, ...fieldProps },
    }
    return fullfieldWithPropsPreset
  })

  return {
    ...stepData,
    step: {
      ...stepData?.step,
      data: { ...stepData?.step?.data, fields: mappedFields },
    },
  }
}
