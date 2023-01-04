import UIPropsPresets from "../constants/ui-props-presets"

export default function applyAutofill(stepData, autoFillData) {
   if (!!autoFillData) {
    const fieldsFromAPI = stepData?.step?.data?.fields

    const mappedFields = fieldsFromAPI.map((field) => {
      const fieldSlug = field?.slug
      const fieldPresetName = field?.["ui:props-preset"]
      const fieldPreset = UIPropsPresets[fieldPresetName] || {}
      const fullFieldValue = {
        ...field,
        "ui:props": { ...field?.["ui:props"], ...fieldPreset },
      }
      const mask = fullFieldValue?.["ui:props"]?.mask
      const autofillValue = autoFillData?.[fieldSlug]?.value
      return {
        ...field,
        ...(autofillValue ? { value: autofillValue } : {}),
      }
    })

    return {
      ...stepData,
      step: {
        ...stepData?.step,
        data: { ...stepData?.step?.data, fields: mappedFields },
      },
    }
  } else return stepData
}
