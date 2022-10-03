import { IFieldConfig } from "../types"

class Field {
  private fieldConfig: IFieldConfig
  constructor(field: IFieldConfig) {
    if (!field) this.fieldConfig = {} as IFieldConfig
    this.fieldConfig = field
  }

  get raw() {
    return this.fieldConfig
  }

  get UIwidget() {
    return this.fieldConfig["ui:widget"]
  }

  get slug() {
    return this.fieldConfig.slug
  }
}

export default Field
