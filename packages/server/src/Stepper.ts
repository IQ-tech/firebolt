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
    console.log("session: ", session)

    return {} as IStepTransitionReturn
  }

  private async getCorrectFormJSONSchema(): Promise<IExperienceJSONSchema> {
    if (this.preDefinedJSONSchema) return this.preDefinedJSONSchema

    return await this.resolvers.getFormJSONSchema(this.experienceId)
  }

  private async createFirstStep(
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

    const experienceMetadata = await this.handleExperienceMetadata(schema)
    return {
      sessionId: v4(),
      step: firstStep,
      capturedData: {},
      errors: {},
      webhookResult: {},
      experienceMetadata,
    } as IStepTransitionReturn
  }

  private async handleExperienceMetadata(
    schema: IExperienceJSONSchema,
    sessionId?: string
  ): Promise<IExperienceMetadata> {
    const session = await this.resolvers.getSession(sessionId)
    const currentFlow = session?.experienceMetadata?.currentFlow ?? "default"

    const flowSteps = schema.flows.find(
      (x) => x.slug === currentFlow
    )?.stepsSlugs

    if (!flowSteps) throw new Error("Flow not found") // TODO: ERRO - retornar erro flow não encontrado

    const lastStepPosition = flowSteps?.length
    const lastStepSlug = flowSteps![lastStepPosition - 1]

    const currentStepSlug = session
      ? flowSteps![session.experienceMetadata.currentPosition - 1]
      : flowSteps![0]

    const currentPosition = session
      ? session.experienceMetadata.currentPosition + 1
      : 1

    let lastCompletedStepSlug = ""

    const stepsList: IFlowStepsListItem[] = flowSteps!.map((item, index) => {
      const schemaStep = schema!.steps.find((x) => x.slug === item)

      if (session && currentStepSlug === item) {
        const filledFieldsKeys = Object.keys(session.steps)
        schemaStep?.fields?.forEach((field) => {
          if (filledFieldsKeys.includes(field.slug))
            lastCompletedStepSlug = item
        })
      }

      return {
        position: index + 1,
        slug: item,
        friendlyName: schemaStep!.friendlyName,
      }
    })

    const metadata: IExperienceMetadata = {
      name: schema.name,
      currentFlow,
      lastStepSlug,
      currentStepSlug,
      currentPosition,
      lastCompletedStepSlug,
      stepsList,
    }

    return metadata
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
