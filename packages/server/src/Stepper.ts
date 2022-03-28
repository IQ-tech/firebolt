import { validateFBTStep, ValidateFBTStepResult } from "@iq-firebolt/validators"
import { v4 } from "uuid"
import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"

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
    const hasFilledFields = this.hasFilledFields(payload)
    const schema = await this.getCorrectFormJSONSchema()
    if (!session && !hasFilledFields) return this.createExperience(schema)
    if (session && !hasFilledFields)
      return this.continueExperience(schema, session)

    return await this.saveExperience(schema, payload, session)

    return {} as IStepTransitionReturn
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private async createExperience(
    schema: IExperienceJSONSchema
  ): Promise<IStepTransitionReturn> {
    const defaultTrack = schema.flows.find((x) => x.slug === "default")
    const firstStepSlug = defaultTrack?.stepsSlugs[0]
    if (!defaultTrack) {
      // TODO: ERRO - retornar erro de que não tem a track default
    }
    const firstStep = schema.steps.find((x) => x.slug === firstStepSlug)

    if (!firstStep) {
      // TODO: ERRO - retornar erro de passo não encontrado no json
      return {} as IStepTransitionReturn
    }

    const experienceMetadata = computeExperienceMetadata(schema)
    return {
      sessionId: v4(),
      step: firstStep,
      capturedData: {},
      errors: {},
      webhookResult: {},
      experienceMetadata,
    } as IStepTransitionReturn
  }

  private continueExperience(
    schema: IExperienceJSONSchema,
    session: IFireboltSession
  ): IStepTransitionReturn {
    const previousStepIndex = schema.steps.findIndex(
      (x) => x.slug === session.experienceMetadata.lastCompletedStepSlug
    )
    if (previousStepIndex === -1) {
      // TODO: tratar erro de step não encontrado
    }

    const currentStep = schema.steps[previousStepIndex + 1]
    const metadata = computeExperienceMetadata(schema, session)
    return {
      sessionId: session.sessionId,
      experienceMetadata: metadata,
      step: currentStep,
      capturedData: session.steps,
      errors: [],
      webhookResult: [],
    }
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
    if (!currentStepJSON) throw new Error("Step not found")

    const validation = this.validate(payload?.fields, currentStepJSON)
    if (!validation.isValid) {
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
    const stepIndex = schema.steps.findIndex(
      (x) => x.slug === newMetadata.currentStepSlug
    )

    if (!!stepIndex) throw new Error("Step not found")

    const step =
      newMetadata.lastStepSlug === newMetadata.currentStepSlug
        ? schema.steps[stepIndex]
        : schema.steps[stepIndex + 1]

    return {
      sessionId: payload!.sessionId,
      errors: {},
      experienceMetadata: newMetadata,
      webhookResult: {},
      step,
      capturedData: newSession.steps,
    }
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

  private hasFilledFields(payload?: IExperienceProceedPayload): boolean {
    return (
      !!payload && !!payload?.fields && Object.keys(payload.fields).length > 0
    )
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
