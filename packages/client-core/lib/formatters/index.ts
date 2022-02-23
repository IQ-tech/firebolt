import applyAutofill from "./applyAutofill"
import applyPropsPresets from "./applyPropsPresets"

 interface IFormatFormOutput {
  autofillData?: Object | any
  addons?: Object | any
} 

export default function formatFormOutput(formData, { autofillData, addons }: IFormatFormOutput = {}) {
  const withPropsPresets = applyPropsPresets(formData, addons)
  return autofillData
    ? applyAutofill(withPropsPresets, autofillData)
    : withPropsPresets
}
