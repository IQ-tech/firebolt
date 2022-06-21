import {
  IAddonsConfig,
  IFormResponseData,
  IPropsPresetCollection,
  IStepConfigField,
} from "../types"
import UIPropsPresets from "../constants/ui-props-presets"

interface ICollectionsMap {
  [key: string]: { [key: string]: any }
}

export default function applyStepPropsPresets(
  stepData: IFormResponseData,
  addons: IAddonsConfig
) {
  const fieldsFromAPI = stepData?.step?.data?.fields
  const mappedFields = mappedFieldsFromAPI(
    fieldsFromAPI,
    addons?.uiPropsPresets
  )

  return {
    ...stepData,
    step: {
      ...stepData?.step,
      data: { ...stepData?.step?.data, fields: mappedFields },
    },
  }
}

function mappedFieldsFromAPI(
  fieldsFromAPI: IStepConfigField[] = [],
  propsPresetsCollections: IPropsPresetCollection[]
) {
  const { collectionsMap, allPresetsMap } = getFormattedPropsPresets(
    propsPresetsCollections
  )

  const mappedFields = fieldsFromAPI.map((field) => {
    return {
      ...field,
      "ui:props": getFieldProps(field, collectionsMap, allPresetsMap),
    }
  })

  return mappedFields
}

export function getFieldProps(
  field: IStepConfigField,
  collectionsMap: ICollectionsMap,
  allPresetsMap
) {
  const fieldPresetName: string = field?.["ui:props-preset"] || ""
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

  const fullfieldWithPropsPreset = { ...fieldPresetProps, ...fieldProps }

  return fullfieldWithPropsPreset
}

export interface IgetFormttedPropsPresets {
  propsPresetsCollections: IPropsPresetCollection[]
  collectionsMap: IgetCollectionsMapReturn
  allCustomPresetsMap: {}
  allPresetsMap: {}
}

export function getFormattedPropsPresets(
  propsPresetsCollections: IPropsPresetCollection[]
) {
  const safePropsPresetsCollections = propsPresetsCollections || [] // {name, presets}[]
  const collectionsMap = getCollectionsMap(safePropsPresetsCollections)
  const allCustomPresetsMap = getCustomPresetsMap(collectionsMap)
  return {
    propsPresetsCollections: safePropsPresetsCollections,
    collectionsMap,
    allCustomPresetsMap,
    allPresetsMap: { ...UIPropsPresets, ...allCustomPresetsMap },
  }
}

interface IgetCollectionsMapReturn {
  [presetName: string]: {
    [key: string]: any
  }
}
function getCollectionsMap(
  propsPresetsCollections: IPropsPresetCollection[]
): IgetCollectionsMapReturn {
  return propsPresetsCollections.reduce((acc, { name, presets }) => {
    return { ...acc, [name]: presets }
  }, {})
}

function getCustomPresetsMap(collectionsMap: ICollectionsMap) {
  const presetsMap = Object.keys(collectionsMap).reduce(
    (acc, collectionName) => {
      const collection = collectionsMap[collectionName]
      return { ...acc, ...collection }
    },
    {}
  )

  return presetsMap
}
