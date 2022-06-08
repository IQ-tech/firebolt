import applyAutofill from "./applyAutofill"
import applyStepPropsPresets from "./applyPropsPresets"
import { IFormResponseData, IAddonsConfig, IUrlParams } from '../types'

 interface IFormatFormOutput {
  autofillData?: IUrlParams
  addons?: IAddonsConfig
} 

export default function formatFormOutput(formData: IFormResponseData, { autofillData, addons }: IFormatFormOutput = {}): IFormResponseData {
  const withPropsPresets = applyStepPropsPresets(formData, addons)
  return autofillData
    ? applyAutofill(withPropsPresets, autofillData)
    : withPropsPresets
}
