import applyAutofill from "./applyAutofill"
import applyPropsPresets from "./applyPropsPresets"
import { IFormResponseData, IAddonsConfig, IUrlParams } from '../types'

 interface IFormatFormOutput {
  autofillData?: IUrlParams
  addons?: IAddonsConfig
} 

export default function formatFormOutput(formData: IFormResponseData, { autofillData, addons }: IFormatFormOutput = {}): IFormResponseData {
  const withPropsPresets = applyPropsPresets(formData, addons)
  return autofillData
    ? applyAutofill(withPropsPresets, autofillData)
    : withPropsPresets
}
