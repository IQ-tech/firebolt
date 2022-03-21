/**
 * 
 */

class Stepper {
  public slug: string
  private preDefinedJSONSchema?: IStepConfig
  private resolvers: IEngineResolvers

  constructor({ slug, formJSONSchema, resolvers }: ICreateEngineOptions) {
    this.slug = slug
    this.preDefinedJSONSchema = formJSONSchema
    this.resolvers = resolvers
  }

  private async getCorrectFormJSONSchema(
    experienceSlug: string
  ): Promise<IStepConfig> {
    if (this.preDefinedJSONSchema) {
      return this.preDefinedJSONSchema
    } else {
      return await this.resolvers.getFormJSONSchema(experienceSlug)
    }
  }

  private createFirstStep(schema: IStepConfig): IStep {
    // Sempre será a track defautlt???
    const defaultTrack = schema.tracks.find((x) => x.slug === "default")

    const firstStep = schema.steps.find(
      (x) => x.step.slug === defaultTrack!.steps[0]
    )

    if (!firstStep?.step) {
      return {} as IStep
    }

    return firstStep.step
  }

  async startHandler(sessionId: string): Promise<IFireboltStepData> {
    const schema = await this.getCorrectFormJSONSchema(this.slug)
    const session = await this.resolvers.getSession(sessionId)
    // verificar se existe uma sessão com esse sessionid no storage (chamar resolver de get session)
    if (session) {
      // se sim vai retornar o proximo passo a ser completado pelo usuário
      return session
    } else {
      // se não, vai criar um novo
      // retornar o primeiro passo do form + novo sessionId
      const sessionId = "sessionId" // FIX: create random id
      const data = this.createFirstStep(schema)
      const meta = await this.metadata(schema)
      const stepData = {
        sessionId,
        meta,
        capturedData: {},
        step: {
          data,
          position: 1,
        },
      } as IFireboltStepData

      await this.resolvers.setSession(stepData)
      return stepData
    }
  }

  async metadata(schema: IStepConfig): Promise<IFireboltStepMeta> {
    if (schema.business === "") {
      return {} as IFireboltStepMeta
    }

    let currentTrackSlug = "default"
    // Obter do banco não implementado
    // if (this.contextUuid) {
    //   const dynamoItem = await getFromDynamo(this.contextUuid)
    //   currentTrackSlug = dynamoItem.track ?? "default"
    // }

    const currentTrack = schema.tracks.find(
      (x) => x.slug == currentTrackSlug
    )

    const forms: IFireboltStepMetaForm[] = currentTrack!.steps.map(
      (item, i) => {
        const stepConfig = schema.steps.find(
          (x) => x.step.slug === item
        )
        return {
          position: i + 1,
          slug: item,
          friendlyname: stepConfig!.step.friendlyname,
        }
      }
    )

    const meta = {
      lastStep: currentTrack!.steps[currentTrack!.steps.length - 1],
      forms: forms,
    }

    return meta
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