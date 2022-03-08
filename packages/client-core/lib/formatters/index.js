import applyAutofill from "./applyAutofill"
import applyPropsPresets from "./applyPropsPresets"

/* interface IFormatFormOutput {
  autofillData?: Object
} */

/**
 * TODO - create formData type 
 * @param {Object} formData 
 * @param {Object} param1 
 */
export default function formatFormOutput(formData, { autofillData, addons } = {}) {
  const withPropsPresets = applyPropsPresets(formData, addons)
  return autofillData
    ? applyAutofill(withPropsPresets, autofillData)
    : withPropsPresets
}
