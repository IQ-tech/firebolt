/**
 * objetivos
 */

class Engine {
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

  proceedHandler(callbackFunction?: () => void) {
    if (callbackFunction) {
        const decisionPayload = callbackFunction()
    } else {
    }

    // function that will run when income next request
    return (dataFromFrontEnd: Object) => {
        
    }
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

export default Engine