import Field from "./Field"
import { IStepConfig } from "../types"

interface IStepTreeConfig {
  fields: Field[]
}

class Step {
  private stepConfig: IStepConfig
  public fields: Field[]

  constructor(stepConfig: IStepConfig) {
    /* this.fields = stepTree.fields */
    this.stepConfig = stepConfig
  }

  getField(fieldSlug: string): Field | undefined {
    const field = this.raw.fields?.find((f) => f.slug === fieldSlug)
    return new Field(field)
  }

  get raw() {
    return this.stepConfig
  }

  get slug() {
    return this.stepConfig.slug
  }

  parse(stepConfig: IStepConfig): void {}
}

export default Step
