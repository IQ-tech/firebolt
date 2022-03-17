class FireboltEngine {
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

function createEngine(engineOptions: ICreateEngineOptions) {
  return new FireboltEngine(engineOptions)
}

// ----------------------------------

/* const fireboltEngine = createEngine()

// se não passar nada no parametro, ele roda o answer.proceed automaticamente
fireboltEngine.proceedHandler((answer) => {
  answer.proceed()
  answer.fieldError()
  answer.preventProceed()
  answer.changeTrack()
}) */



/* import {createEngine} from "firebolt-server" */



