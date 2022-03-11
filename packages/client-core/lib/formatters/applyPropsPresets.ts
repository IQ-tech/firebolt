import UIPropsPresets from "../constants/ui-props-presets"

export default function applyPropsPresets(stepData, addons) {
  const propsPresetsCollections = addons?.uiPropsPresets || [] // {name, presets}[]
  const collectionsMap = getCollectionsMap(propsPresetsCollections)
  const allCustomPresetsMap = getCustomPresetsMap(collectionsMap)
  const allPresetsMap = { ...UIPropsPresets, ...allCustomPresetsMap }
  const fieldsFromAPI = stepData?.step?.data?.fields

  const mappedFields = mappedFieldsFromAPI(
    fieldsFromAPI,
    collectionsMap,
    allPresetsMap
  )

  return {
    ...stepData,
    step: {
      ...stepData?.step,
      data: { ...stepData?.step?.data, fields: mappedFields },
    },
  }
}

function mappedFieldsFromAPI(fieldsFromAPI = [], collectionsMap, allPresetsMap) {
  const mappedFields = fieldsFromAPI.map((field) => {
    const fieldPresetName = field?.["ui:props-preset"] || ""
    const [collectionPreset, specificCollection] = fieldPresetName?.split(":")
    const useSpecificCollection = !!specificCollection
    const fieldProps = field?.["ui:props"]

    if (useSpecificCollection) {
      const collection = collectionsMap?.[specificCollection]
      if (!collection) {
        throw new Error("Collection does not exists")
      }
      const hasPreset = !!collection?.[collectionPreset]
      if (!hasPreset) {
        throw new Error(
          `Collection ${specificCollection} doesn't have preset ${collectionPreset}`
        )
      }
    }

    const fieldPresetProps = useSpecificCollection
      ? collectionsMap?.[specificCollection]?.[collectionPreset]
      : allPresetsMap[fieldPresetName] || {}

    const fullfieldWithPropsPreset = {
      ...field,
      "ui:props": { ...fieldPresetProps, ...fieldProps },
    }

    return fullfieldWithPropsPreset
  })

  return mappedFields
}

function getCollectionsMap(propsPresetsCollections) {
  return propsPresetsCollections.reduce((acc, { name, presets }) => {
    return { ...acc, [name]: presets }
  }, {})
}

function getCustomPresetsMap(collectionsMap) {
  const presetsMap = Object.keys(collectionsMap).reduce(
    (acc, collectionName) => {
      const collection = collectionsMap[collectionName]
      return { ...acc, ...collection }
    },
    {}
  )

  return presetsMap
}
