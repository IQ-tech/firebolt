import { validateFBTStep, ValidateFBTStepResult } from "@iq-firebolt/validators"
import { v4 } from "uuid"
import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
  IExperienceMetadata,
  IFlowStepsListItem,
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
    const schema = await this.getCorrectFormJSONSchema()
    if (!session) return this.getFirstStep(schema)

    const hasFilledFields = this.hasFilledFields(payload)
    if (hasFilledFields) {
      // TODO: TRATAR O PAYLOAD
    }

    return this.getCorrectStep(schema, session)
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private async getFirstStep(
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

  private getCorrectStep(
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
