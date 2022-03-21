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
    // recebe o payload do passo atual
    // valida o passo atual
    // descobre a config do proximo passo
      // vai ter o json completo local ou para ser resolvido (ex filesystem) 
        // descobrir qual é o proximo passo
      // ou receberá diretamente o json do próximo passo (remote)
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