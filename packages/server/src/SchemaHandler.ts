import { IExperienceJSONSchema } from "./types"

export default class SchemaHandler {
  private _current?: IExperienceJSONSchema
  constructor() {}

  loadJSONSchema() {}

  getStepDefinition(stepSlug) {}
  getFirstStepFromFlow(flow = "default") {}
  getFlow(flowSlug: string) {}
}
