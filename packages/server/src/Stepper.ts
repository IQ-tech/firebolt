/**
 * 
 */

class Stepper {
  private preDefinedJSONSchema?: Object
  private resolvers?: IEngineResolvers

  constructor({ formJSONSchema, resolvers }: ICreateEngineOptions) {
    this.preDefinedJSONSchema = formJSONSchema
    this.resolvers = resolvers
  }

  private async getCorrectFormJSONSchema(experienceSlug: string) {
    if (this.preDefinedJSONSchema) {
      return this.preDefinedJSONSchema
    } else {
      return await this?.resolvers?.getFormJSONSchema(experienceSlug)
    }
  }

  startHandler(){

  }

  proceedHandler(callbackFunction?: () => void) {
  }

  goBackHandler() {
    return () => {}
  }

  debugHandler() {
    return () => {}
  }

  uploadHandler() {
    return () => {}
  }
}

export default Stepper