import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"

import SessionHandler from "./SessionHandler"
import JSONConfig from "./JSONConfig"

// helpers
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"
import validateStep from "./helpers/validateStep"
import { equals } from "ramda"

class Stepper {
  private experienceId: string
  private preDefinedJSONConfig: boolean
  private resolvers: IEngineResolvers
  private session: SessionHandler
  private JSONConfig: JSONConfig

  constructor({
    experienceId,
    experienceJSONConfig,
    resolvers,
  }: ICreateEngineOptions) {
    this.experienceId = experienceId
    this.resolvers = resolvers
    this.session = new SessionHandler(this.resolvers)
    this.preDefinedJSONConfig = !!experienceJSONConfig
    this.JSONConfig = new JSONConfig(
      experienceJSONConfig as IExperienceJSONSchema
    )
  }

  private async loadJSONConfig() {
    const hasPredefinedJSONConfig = !!this.JSONConfig
    const hasJSONConfigResolver = !!this.resolvers.getExperienceJSON
    if (!hasPredefinedJSONConfig && !hasJSONConfigResolver) {
      throw new Error("must provide a way to access the config json")
    }
    if (!this.preDefinedJSONConfig) {
      const newJSON = await this.resolvers.getExperienceJSON(this.experienceId)
      this.JSONConfig = new JSONConfig(newJSON)
    }
  }

  private getReceivingStepSlug({
    session,
  }: {
    session: IFireboltSession | undefined
  }) {
    const receivingStepSlug = session
      ? session.experienceState.visualizingStepSlug
      : this.JSONConfig?.getFirstStepFromFlow("default").slug

    return receivingStepSlug as string
  }

  // dado um slug de step, a função deve retornar o próximo
  private getReturningStepDefinition(
    stepSlug: string,
    session?: IFireboltSession
  ) {
    const receivingFlowSlug = session?.experienceState.currentFlow || "default"
    const receivingFlow = this.JSONConfig?.getFlow(receivingFlowSlug)
    const receivingStepIndex = receivingFlow!.stepsSlugs.indexOf(stepSlug)
    const returningStepSlug = receivingFlow?.stepsSlugs[receivingStepIndex + 1]
    if (returningStepSlug) {
      return this.JSONConfig?.getStepDefinition(returningStepSlug)
    }
  }

  private async createTransitionReturn({
    errors = {},
    webhookResult = {},
    returningStep,
  }): Promise<IStepTransitionReturn> {
    const session = this.session.current
    const computedMetadata = computeExperienceMetadata(this.JSONConfig, session)
    // apply plugins

    return {
      sessionId: session?.sessionId || "",
      step: returningStep,
      capturedData: session?.steps || {},
      errors: errors,
      webhookResult: webhookResult,
      experienceMetadata: computedMetadata,
    }
  }

  /**
   * lida com dois casos de transição de experiencia:
   * Iniciando uma experiencia do zero (request sem session id)
   * resumindo uma sessão (somente sessionId)
   *  no caso de resumindo, retornamos o passo de acordo com o estado salvo
   */
  async start(
    payload?: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    await this.session.loadSessionFromStorage(payload?.sessionId)
    await this.loadJSONConfig()
    const session = this.session.current
    const stepToReturn = session
      ? this.JSONConfig?.getStepDefinition(
          session.experienceState.visualizingStepSlug
        )
      : this.JSONConfig?.getFirstStepFromFlow("default")

    if (!stepToReturn) throw new Error("Step not found") // TODO: handle error
    return await this.createTransitionReturn({ returningStep: stepToReturn })
  }

  async proceed(
    payload: IExperienceProceedPayload = {},
    decisionCB?: () => void
  ): Promise<IStepTransitionReturn> {
    /**
     * Todo
     * - process returning definition
     * - errors + validation
     * - group return formatting
     * - validate payload format
     * - decision callback
     * - experience hooks
     * - webhook call
     */

    // todo - validate payload format
    await this.session.loadSessionFromStorage(payload?.sessionId)
    await this.loadJSONConfig()

    const session = this.session.current

    // descobrir o slug do receiving
    const receivingStepSlug = this.getReceivingStepSlug({ session })
    const receivingStepDefinition =
      this.JSONConfig!.getStepDefinition(receivingStepSlug)
    const isCustomStep = receivingStepDefinition?.type !== "form"
    const isFirstStep = !session
    const isAnAlreadyVisitedStep = Object.keys(session?.steps || []).includes(
      receivingStepSlug
    )
    const isFieldsValidationNeeded = (() => {
      if (isCustomStep) return false
      if (isAnAlreadyVisitedStep) {
        const storedReceivedStepPayload = session?.steps?.[receivingStepSlug]
        const paramReceivedStepPayload = payload.fields
        return !equals(storedReceivedStepPayload, paramReceivedStepPayload)
      }
      return true
    })()

    // TODO: alterar forma de guardar erros que ocorreram?????
    const validation = isFieldsValidationNeeded
      ? validateStep(payload?.fields, receivingStepDefinition)
      : { isValid: true, invalidFields: [] }

    const isStepFieldsValid =
      (isFieldsValidationNeeded && validation.isValid) ||
      !isFieldsValidationNeeded

    if (!isStepFieldsValid) {
      return await this.createTransitionReturn({
        returningStep: receivingStepDefinition,
        errors: validation,
      })
    }

    if (isFirstStep && isStepFieldsValid) {
      await this.session.createSession(this.JSONConfig, "default")
    }

    await this.session.addCompletedStep(receivingStepSlug, {
      fields: payload.fields,
    })

    const returningStepDefinition = this.getReturningStepDefinition(
      receivingStepSlug,
      session
    )
    const isLastStepOfFlow = !returningStepDefinition

    if (isLastStepOfFlow) {
      await this.session.completeExperience()
      return this.createTransitionReturn({ returningStep: {} as IStepJSON })
    }

    await this.session.setVisualizingStepSlug(returningStepDefinition.slug)
    return await this.createTransitionReturn({
      returningStep: returningStepDefinition,
    })
  }

  async goBackHandler(
    payload: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    return {} as IStepTransitionReturn
  }

  async debugHandler(
    stepSlug: string
  ): Promise<void> /* Promise<IStepTransitionReturn>  */ {
    // const JSONSchema = await this.getCorrectFormJSONSchema()
    // const stepDefinition = JSONSchema.steps.find(
    //   (step) => step.slug === stepSlug
    // )
    // const metadata = computeExperienceMetadata(JSONSchema)
    /* const step = this.getStep(JSONSchema, metadata) */
    /*     return {
      sessionId: "",
      webhookResult: {},
      errors: {},
      step
    } */
  }

  uploadHandler() {
    return () => {}
  }
}

export default Stepper
