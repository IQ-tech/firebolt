import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
  IExperienceMetadata,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"

// helpers
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"
import getHasFilledFields from "./helpers/getHasFilledFields"
import validateStep from "./helpers/validateStep"
import createExperience from "./helpers/createExperience"
import continueExperience from "./helpers/continueExperience"

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
    const hasFilledFields = getHasFilledFields(payload)
    const schema = await this.getCorrectFormJSONSchema()

    if (!session && !hasFilledFields) return createExperience(schema)
    if (session && !hasFilledFields) return continueExperience(schema, session)

    return await this.saveExperience(schema, payload, session)
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private async saveExperience(
    schema: IExperienceJSONSchema,
    payload?: IExperienceProceedPayload,
    session?: IFireboltSession
  ): Promise<IStepTransitionReturn> {
    if (!payload?.sessionId) throw new Error("SessionId not found") // TODO: TRATAR ERRO

    const metadata = computeExperienceMetadata(schema, session)
    const currentStepJSON = schema.steps.find(
      (x) => x.slug === metadata.currentStepSlug
    )
    const stepType = currentStepJSON?.type
    if (!currentStepJSON) throw new Error("Step not found") // TODO: TRATAR ERRO

    const validation = validateStep(payload?.fields, currentStepJSON)
    if (!validation.isValid && stepType !== "custom") {
      const errors = !validation.isValid ? validation : []
      return {
        sessionId: payload?.sessionId,
        experienceMetadata: metadata,
        capturedData: session?.steps ?? {},
        step: currentStepJSON,
        webhookResult: [],
        errors,
      }
    }

    // TODO: IMPLEMENTAR WEBHOOKS AQUI OU FORA????

    const newSession: IFireboltSession = {
      sessionId: payload?.sessionId ?? session!.sessionId,
      experienceMetadata: metadata,
      steps: {
        ...session?.steps,
        [metadata.currentStepSlug]: { ...payload?.fields },
      },
    }

    await this.resolvers.setSession(newSession)
    const newMetadata = computeExperienceMetadata(schema, newSession)
    const step = this.getStep(schema, newMetadata, "next")

    return {
      sessionId: payload!.sessionId,
      errors: {},
      experienceMetadata: newMetadata,
      webhookResult: {},
      step,
      capturedData: newSession.steps,
    }
  }

  private getStep(
    schema: IExperienceJSONSchema,
    metadata: IExperienceMetadata,
    action: "previous" | "current" | "next"
  ): IStepJSON {
    const actions = {
      previous: -1,
      current: 0,
      next: 1,
    }

    const position = actions[action]

    const currentFlowSlug = metadata?.currentFlow ?? "default"
    const currentFlow = schema.flows.find((x) => x.slug === currentFlowSlug)
    if (!currentFlow) throw new Error("Flow Not found") // TODO: TRATAR ERRO

    const stepIndex = currentFlow.stepsSlugs.indexOf(metadata.currentStepSlug)
    if (stepIndex === -1) throw new Error("Step not found") // TODO: TRATAR ERRO

    const step = schema.steps.find(
      (x) => x.slug === currentFlow.stepsSlugs[stepIndex + position]
    )

    if (!step) throw new Error("Step not found") // TODO: TRATAR ERRO

    return step
  }

  async goBackHandler(
    payload: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    const schema = await this.getCorrectFormJSONSchema()
    const session = await this.resolvers.getSession(payload?.sessionId)
    if (!session)
      throw new Error("Não pode voltar se estiver no primeiro passo") // TODO: TRATAR ERRO

    const metadata = computeExperienceMetadata(schema, session, true)
    const step = this.getStep(schema, metadata, "current")
    await this.resolvers.setSession({
      sessionId: session.sessionId,
      experienceMetadata: metadata,
      steps: session.steps,
    })

    return {
      sessionId: session.sessionId,
      experienceMetadata: metadata,
      capturedData: session.steps,
      webhookResult: {},
      errors: {},
      step,
    }
  }

  debugHandler() {
    return () => {}
  }

  uploadHandler() {
    return () => {}
  }
}

export default Stepper
