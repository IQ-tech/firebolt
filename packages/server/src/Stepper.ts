import { v4 } from "uuid"

import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
  IExperienceMetadata,
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

  async proceed(
    payload?: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    const session = await this.resolvers.getSession(payload?.sessionId)
    const schema = await this.getCorrectFormJSONSchema()

    if (!session) return this.createFirstStep(schema)

    return {} as IStepTransitionReturn
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private createFirstStep(
    schema: IExperienceJSONSchema
  ): IStepTransitionReturn {
    const defaultTrack = schema.flows.find((x) => x.slug === "default")
    const firstStepSlug = defaultTrack?.stepsSlugs[0]
    if (!defaultTrack) {
      // retornar erro de que não tem a track default
    }
    const firstStep = schema.steps.find((x) => x.slug === firstStepSlug)

    if (!firstStep) {
      // retornar erro de passo não encontrado no json
      return {} as IStepTransitionReturn
    }
    return {
      sessionId: v4(),
      step: firstStep,
      capturedData: {},
      errors: {},
      webhookResult: {},
    } as IStepTransitionReturn
  }

  private async handleExperienceMetadata(
    schema: IExperienceJSONSchema,
    sessionId?: string
  ): Promise<IExperienceMetadata> {
    return {} as IExperienceMetadata

    const session = await this.resolvers.getSession(sessionId)
    const currentFlow = session?.experienceMetadata.currentFlow ?? "default"

    const newMetadata = {
      name: schema.name,
      currentFlow,
    }

    // export interface IExperienceMetadata {
    //   name: string
    //   currentFlow: string | "default"
    //   currentStepSlug: string
    //   lastCompletedStepSlug: string
    //   currentPosition: number
    //   lastStepSlug: string
    //   stepsList?: IFlowStepsListItem[]
    // }
  }

  // async metadata(schema: IExperienceJSONSchema): Promise<IFireboltStepMeta> {
  //   if (schema.business === "") {
  //     return {} as IFireboltStepMeta
  //   }

  //   let currentTrackSlug = "default"
  //   // Obter do banco não implementado
  //   // if (this.contextUuid) {
  //   //   const dynamoItem = await getFromDynamo(this.contextUuid)
  //   //   currentTrackSlug = dynamoItem.track ?? "default"
  //   // }

  //   const currentTrack = schema.tracks.find((x) => x.slug == currentTrackSlug)

  //   const forms: IFireboltStepMetaForm[] = currentTrack!.steps.map(
  //     (item, i) => {
  //       const stepConfig = schema.steps.find((x) => x.step.slug === item)
  //       return {
  //         position: i + 1,
  //         slug: item,
  //         friendlyname: stepConfig!.step.friendlyname,
  //       }
  //     }
  //   )

  //   const meta = {
  //     lastStep: currentTrack!.steps[currentTrack!.steps.length - 1],
  //     forms: forms,
  //   }

  //   return meta
  // }

  // private getCurrentStep(
  //   session: IFireboltSession | undefined,
  //   schema: IExperienceJSONSchema
  // ): IStepJSON {
  //   const currentTrackSlug = session?.currentTrack ?? "default"
  //   const stepPosition = session?.step.position ?? 1
  //   const track = schema.tracks.find((x) => x.slug === currentTrackSlug)
  //   const stepSlug = track!.steps[stepPosition - 1]
  //   const currentStep = schema.steps.find((x) => x.step.slug === stepSlug)

  //   if (!currentStep) throw new Error("Step not found") // TODO: Ver como tratar erros

  //   return { ...currentStep.step }
  // }

  // async proceedHandler(formPayload: IExperiencePayload) {
  //   const session = await this.resolvers.getSession()
  //   const schema = await this.getCorrectFormJSONSchema()

  //   // recebe o payload do passo atual
  //   // valida o passo atual
  //   const currentStep = this.getCurrentStep(session, schema)
  //   const validationResult = this.validate(formPayload, currentStep)
  //   console.log("validationResult: ", JSON.stringify(validationResult))

  //   if (!validationResult.isValid) throw new Error("Validation Error") //FIXME: Como devolver erros de validação.

  //   // API salva no banco
  //   // Roda webhook
  //   // salva no banco de novo

  //   const payloadExample = {
  //     "fields": [
  //       { "full_name": "teste teste" },
  //       { "email": "teste@teste.com" },
  //     ],
  //     "metadata": {},
  //   }

  //   // descobre a config do proximo passo
  //   // vai ter o json completo local ou para ser resolvido (ex filesystem)
  //   // descobrir qual é o proximo passo
  //   // ou receberá diretamente o json do próximo passo (remote)
  // }

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
