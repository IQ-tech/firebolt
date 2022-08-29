import Field from "./Field"
import { IStepConfig } from "../types"

interface IStepTreeConfig {
  fields: Field[]
}

class Step {
  private raw: IStepConfig
  public fields: Field[]

  constructor(stepTree: IStepTreeConfig) {
    this.fields = stepTree.fields
  }

  getField(fieldSlug: string): Field | undefined {
    const field = this.raw.fields?.find((f) => f.slug === fieldSlug)
    return new Field(field)
  }

  parse(stepConfig: IStepConfig): void {}
}

export default Step
