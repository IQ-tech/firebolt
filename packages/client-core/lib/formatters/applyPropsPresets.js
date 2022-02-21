import UIPropsPresets from "../constants/ui-props-presets"

function customPresetsMap(collectionsMap) {
  const presetsMap = Object.keys(collectionsMap).reduce((acc, collectionName ) => {
    const collection = collectionsMap[collectionName]
    const collectionPresets = collection?.presets || {}
    return {...acc, ...collectionPresets}
  }, {});

  return presetsMap;
}

function mappedFieldsFromAPI(fieldsFromAPI, collectionsMap, allPresetsMap) {
  const mappedFields = fieldsFromAPI.map((field) => {
    const fieldPresetName = field?.["ui:props-preset"] || "";
    const specificCollection = fieldPresetName?.split(":")[1];

    const useSpecificCollection = !!specificCollection;
  
    const fieldProps = field?.["ui:props"];

    if(useSpecificCollection){
      const hasCollection = collectionsMap[specificCollection];
      if(!hasCollection){
        throw new Error("Collection does not exists");
      }
    }

    const fieldPresetProps = useSpecificCollection 
      ? collectionsMap[specificCollection] 
      : allPresetsMap[fieldPresetName] || {}
      
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

  const collectionsMap = propsPresetsCollections.reduce((acc, {name, presets}) => {
    return {...acc, [name]: presets}
  }, {})

  const allCustomPresetsMap =  customPresetsMap(collectionsMap);

  const allPresetsMap = {...UIPropsPresets, ...allCustomPresetsMap};

  const fieldsFromAPI = stepData?.step?.data?.fields
  const mappedFields = mappedFieldsFromAPI(fieldsFromAPI, collectionsMap, allPresetsMap);

  return {
    ...stepData,
    step: {
      ...stepData?.step,
      data: { ...stepData?.step?.data, fields: mappedFields },
    },
  }
}
