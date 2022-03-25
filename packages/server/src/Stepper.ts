import { v4 } from "uuid"

import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"
import { validateFBTStep, ValidateFBTStepResult } from "@iq-firebolt/validators"

class Stepper {
  private experienceId: string
  private preDefinedJSONSchema?: IExperienceJSONSchema
  private resolvers: IEngineResolvers

  constructor({
    experienceId,
    experienceJSONSchema,
    resolvers,
  }: ICreateEngineOptions) {
    this.experienceId = experienceId
    this.preDefinedJSONSchema = experienceJSONSchema
    this.resolvers = resolvers
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private createFirstStep(schema: IExperienceJSONSchema): IStepJSON {
    // Sempre será a track default???
    const defaultTrack = schema.flows.find((x) => x.slug === "default")

    const firstStep = schema.steps.find(
      (x) => x.slug === defaultTrack!.steps[0]
    )

    if (!firstStep) {
      return {} as IStepJSON
    }

    return firstStep
  }

  async proceed(sessionId?: string): Promise<IStepTransitionReturn> {
    // descobrir se tem sessão no storage
    const session = await this.resolvers.getSession(sessionId)
    // se não tiver sessão vamos começar do zero e criar um token novo

    return {} as IStepTransitionReturn
  }

  async metadata(schema: IExperienceJSONSchema): Promise<IFireboltStepMeta> {
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

  private getCurrentStep(
    session: IFireboltSession | undefined,
    schema: IExperienceJSONSchema
  ): IStepJSON {
    const currentTrackSlug = session?.currentTrack ?? "default"
    const stepPosition = session?.step.position ?? 1
    const track = schema.tracks.find((x) => x.slug === currentTrackSlug)
    const stepSlug = track!.steps[stepPosition - 1]
    const currentStep = schema.steps.find((x) => x.step.slug === stepSlug)

    if (!currentStep) throw new Error("Step not found") // TODO: Ver como tratar erros

    return { ...currentStep.step }
  }

  async proceedHandler(formPayload: IFireboltRequest) {
    const session = await this.resolvers.getSession(this.sessionId)
    const schema = await this.getCorrectFormJSONSchema()

    // recebe o payload do passo atual
    // valida o passo atual
    const currentStep = this.getCurrentStep(session, schema)
    const validationResult = this.validate(formPayload, currentStep)
    console.log("validationResult: ", JSON.stringify(validationResult))

    if (!validationResult.isValid) throw new Error("Validation Error") //FIXME: Como devolver erros de validação.

    // API salva no banco
    // Roda webhook
    // salva no banco de novo

    const payloadExample = {
      "fields": [
        { "full_name": "teste teste" },
        { "email": "teste@teste.com" },
      ],
      "metadata": {},
    }

    // descobre a config do proximo passo
    // vai ter o json completo local ou para ser resolvido (ex filesystem)
    // descobrir qual é o proximo passo
    // ou receberá diretamente o json do próximo passo (remote)
  }

  private validate(
    formPayload = {},
    currentStepConfig: IStepJSON
  ): ValidateFBTStepResult {
    if (!currentStepConfig) {
      return { isValid: false, invalidFields: [] }
    }

    if (currentStepConfig.type !== "form") {
      formPayload[currentStepConfig.type] = "completed"
    }

    return validateFBTStep({
      stepFields: currentStepConfig.fields!,
      formPayload,
    })
  }

  async goBackHandler() {}

  debugHandler() {
    return () => {}
  }

  uploadHandler() {
    return () => {}
  }
}

export default Stepper
