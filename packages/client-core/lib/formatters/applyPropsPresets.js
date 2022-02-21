import UIPropsPresets from "../constants/ui-props-presets"



function mappedFieldsFromAPI(fieldsFromAPI, collectionsMap, allPresetsMap) {
  const mappedFields = fieldsFromAPI.map((field) => {
    const fieldPresetName = field?.["ui:props-preset"] || "";
    const [collectionPreset, specificCollection] = fieldPresetName?.split(":")
    console.log("askdjskjf", collectionPreset, specificCollection)
    const useSpecificCollection = !!specificCollection;
    const fieldProps = field?.["ui:props"];

    if(useSpecificCollection){
      const collection = collectionsMap[specificCollection];
      if(!collection){
        throw new Error("Collection does not exists");
      }
      const hasPreset = !!collection[collectionPreset]
      if(!hasPreset){
        throw new Error(`Collection ${specificCollection} doesn't have preset ${collectionPreset}`)

      }
    }

    const fieldPresetProps = useSpecificCollection 
      ? collectionsMap?.[specificCollection]?.[collectionPreset] 
      : allPresetsMap[fieldPresetName] || {}

      /* console.log("LULU", specificCollection, collectionPreset, collectionsMap )
      console.log("LELE", fieldPresetProps) */
      
    const fullfieldWithPropsPreset = {
      ...field,
      "ui:props": { ...fieldPresetProps, ...fieldProps },
    }

    return fullfieldWithPropsPreset
  });

  return mappedFields;
}

export default function applyPropsPresets(stepData, addons) {
  const propsPresetsCollections = addons?.uiPropsPresets || [];
  const collectionsMap = getCollectionsMap(propsPresetsCollections)
  const allCustomPresetsMap =  getCustomPresetsMap(collectionsMap);
  const allPresetsMap = {...UIPropsPresets, ...allCustomPresetsMap};
  const fieldsFromAPI = stepData?.step?.data?.fields

  console.log("KAJSDKF", collectionsMap)
  const mappedFields = mappedFieldsFromAPI(fieldsFromAPI, collectionsMap, allPresetsMap);

  return {
    ...stepData,
    step: {
      ...stepData?.step,
      data: { ...stepData?.step?.data, fields: mappedFields },
    },
  }
}

function getCollectionsMap(propsPresetsCollections){
  console.log("Aquiiiiiii",propsPresetsCollections)
  return propsPresetsCollections.reduce((acc, {name, presets}) => {
    return {...acc, [name]: presets}
  }, {})
}

function getCustomPresetsMap(collectionsMap) {
  const presetsMap = Object.keys(collectionsMap).reduce((acc, collectionName ) => {
    const collection = collectionsMap[collectionName]
    const collectionPresets = collection?.presets || {}
    return {...acc, ...collectionPresets}
  }, {});

  return presetsMap;
}
