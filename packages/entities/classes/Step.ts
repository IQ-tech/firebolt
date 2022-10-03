import Field from "./Field"
import { IStepConfig, IFieldConfig } from "../types"

class Step {
  private stepConfig: IStepConfig
  private fields: Field[]

  constructor(stepConfig: IStepConfig) {
    const configFields = stepConfig?.fields || ([] as IFieldConfig[])
    this.stepConfig = stepConfig
    this.fields = configFields.map((fieldConfig) => new Field(fieldConfig))
  }

  getField(fieldSlug: string): Field | undefined {
    return this.fields.find((field) => field.slug === fieldSlug)
  }

  get raw() {
    return this.stepConfig
  }

  get slug() {
    return this.stepConfig.slug
  }
}

export default Step
