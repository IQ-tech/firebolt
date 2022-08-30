import { IFieldConfig } from "../types"

class Field {
  private fieldConfig: IFieldConfig
  constructor(fieldConfig: IFieldConfig | undefined) {
    if (!fieldConfig) return
    this.fieldConfig = fieldConfig
  }

  get raw() {
    return this.fieldConfig
  }
}

export default Field
