import { conformToMask } from "text-mask-core";

import UIPropsPresets from "../constants/ui-props-presets";

export default function processAutofillFields(stepData, autoFillData) {
	const maskValue = (value, mask) => {
		return mask ? conformToMask(value, mask).conformedValue : value;
	}

	const fieldsFromAPI = stepData?.step?.data?.fields;

	const mappedFields = fieldsFromAPI.map(field => {
		const fieldSlug = field?.slug;

		const fieldPresetName = field?.["ui:props-preset"];
		const fieldPreset = UIPropsPresets[fieldPresetName] || {};

		const fullFieldValue = {...field, "ui:props": { ...field?.["ui:props"], ...fieldPreset }};

		const mask = fullFieldValue?.["ui:props"]?.mask;

		const autofillValue = autoFillData?.[fieldSlug]?.value;

		return {...field, ...(autofillValue ? { value: maskValue(autofillValue, mask) } : {})}
	});

	return {...stepData, step: { ...stepData?.step, data: { ...stepData?.step?.data, fields: mappedFields } }};
}