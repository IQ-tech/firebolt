import { v4 } from "uuid"

import {
  ICreateEngineOptions,
  IEngineResolvers,
  IFireboltStepData,
  IFireboltStepMeta,
  IFireboltStepMetaForm,
  IStep,
  IStepConfig,
} from "./types"

class Stepper {
  private slug: string
  private sessionId?: string
  private preDefinedJSONSchema?: IStepConfig
  private resolvers: IEngineResolvers

  constructor({
    slug,
    sessionId,
    formJSONSchema,
    resolvers,
  }: ICreateEngineOptions) {
    this.slug = slug
    this.sessionId = sessionId
    this.preDefinedJSONSchema = formJSONSchema
    this.resolvers = resolvers
  }

  private async getCorrectFormJSONSchema(
    experienceSlug: string
  ): Promise<IStepConfig> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(experienceSlug)
  }

  private createFirstStep(schema: IStepConfig): IStep {
    // Sempre será a track default???
    const defaultTrack = schema.tracks.find((x) => x.slug === "default")

    const firstStep = schema.steps.find(
      (x) => x.step.slug === defaultTrack!.steps[0]
    )

    if (!firstStep?.step) {
      return {} as IStep
    }

    return firstStep.step
  }

  async startHandler(): Promise<IFireboltStepData> {
    const schema = await this.getCorrectFormJSONSchema(this.slug)
    const session = await this.resolvers.getSession(this.sessionId)

    if (session) return session

    const sessionId = v4()
    const data = this.createFirstStep(schema)
    const meta = await this.metadata(schema)
    return {
      sessionId,
      currentTrack: "default",
      meta,
      capturedData: {},
      step: {
        data,
        position: 1,
      },
    } as IFireboltStepData
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

    const currentTrack = schema.tracks.find((x) => x.slug == currentTrackSlug)

    const forms: IFireboltStepMetaForm[] = currentTrack!.steps.map(
      (item, i) => {
        const stepConfig = schema.steps.find((x) => x.step.slug === item)
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
