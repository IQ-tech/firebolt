// types
import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IFireboltSession,
  IExperienceProceedPayload,
  IExperienceDecisionCallbackFunction,
  IExperienceDecision,
  IExperienceDecisionAction,
  IExperienceDecisionOptions,
} from "./interfaces/IEngine"
import { IExperienceJSONSchema, IStepJSON } from "./types"

// handlers
import SessionHandler from "./SessionHandler"
import JSONConfig from "./JSONConfig"

// helpers
import computeExperienceMetadata from "./helpers/computeExperienceMetadata"
import validateStep from "./helpers/validateStep"
import getIsFieldsValidationNeeded from "./helpers/getIsFieldsValidationNeeded"

class Engine {
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
      throw "noWayToFindJSONConfig" // TODO Handle error
    }
    if (!this.preDefinedJSONConfig && !!this.resolvers.getExperienceJSON) {
      const newJSON = await this.resolvers.getExperienceJSON(this.experienceId)
      if (!newJSON) {
        throw "JSONConfigNotFound" // TODO Handle error
      }
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

    return receivingStepSlug
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
    processedData = {},
    returningStep,
  }): Promise<IStepTransitionReturn> {
    const session = this.session.current
    const computedMetadata = computeExperienceMetadata(this.JSONConfig, session)
    // apply plugins
    // apply autofill
    return {
      sessionId: session?.sessionId || "",
      step: returningStep,
      capturedData: session?.steps || {},
      errors: errors,
      experienceMetadata: computedMetadata,
      processedData,
    }
  }

  private useDecisionCallback(
    decisionCB: IExperienceDecisionCallbackFunction,
    payload: IExperienceProceedPayload
  ): Promise<IExperienceDecision> {
    return new Promise((res) => {
      const decisionCreator = (
        action: IExperienceDecisionAction,
        options?: IExperienceDecisionOptions
      ) => {
        res({ action, options })
      }

      decisionCB(decisionCreator, {
        sessionData: this.session.current,
        receivingStepData: payload,
      })
    })
  }

  /**
   * lida com dois casos de transição de experiencia:
   * Iniciando uma experiência do zero (request sem session id)
   * resumindo uma sessão (somente sessionId)
   *  no caso de resumindo, retornamos o passo de acordo com o estado salvo
   */
  async start(
    payload?: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    await this.session.loadSessionFromStorage(payload?.sessionId)
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
    decisionCB?: IExperienceDecisionCallbackFunction
  ): Promise<IStepTransitionReturn> {
    /**
     * Todo
     * - process returning definition
     * - errors + validation
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
    const isFieldsValidationNeeded = getIsFieldsValidationNeeded({
      session,
      payload,
      receivingStepSlug,
      isCustomStep,
      isAnAlreadyVisitedStep,
    })

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

    // decision point
    const decision = decisionCB
      ? await this.useDecisionCallback(decisionCB, payload)
      : ({} as IExperienceDecision)

    const processedData = decision?.options?.processedData || {}

    if (decision?.action === "blockProgression") {
      return await this.createTransitionReturn({
        returningStep: receivingStepDefinition,
        errors: decision?.options?.errors,
      })
    }

    if (isFirstStep && isStepFieldsValid) {
      await this.session.createSession(
        this.JSONConfig,
        decision?.options?.newFlow || "default"
      )
    }

    if (decision?.action === "changeFlow") {
      const newFlow = decision?.options?.newFlow || ""
      if (!newFlow) throw new Error("flow not found") //retornar erro de flow inválido (ou se o flow não existe no json)
      this.session.changeCurrentFlow(newFlow)
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
    await this.session.loadSessionFromStorage(payload?.sessionId)
    await this.loadJSONConfig()

    if (!this.session.current) {
      const returningStep = this.JSONConfig.getFirstStepFromFlow()
      return this.createTransitionReturn({
        returningStep,
      })
    }

    const currentState = this.session.current.experienceState
    const visualizingStepSlug = currentState.visualizingStepSlug
    const currentFlow = this.JSONConfig.getFlow(currentState.currentFlow)
    const visualizingStepIndex =
      currentFlow.stepsSlugs.indexOf(visualizingStepSlug)
    const previousStepSlug = currentFlow.stepsSlugs[visualizingStepIndex - 1]
    const hasPreviousStep = !!previousStepSlug

    if (hasPreviousStep) {
      const returningStep = this.JSONConfig.getStepDefinition(previousStepSlug)
      await this.session.setVisualizingStepSlug(previousStepSlug)
      return this.createTransitionReturn({ returningStep })
    } else {
      const returningStep =
        this.JSONConfig.getStepDefinition(visualizingStepSlug)
      return this.createTransitionReturn({
        returningStep,
      })
    }
  }

  async debugHandler(stepSlug: string): Promise<IStepTransitionReturn> {
    const returningStep = this.JSONConfig.getStepDefinition(stepSlug)
    return this.createTransitionReturn({ returningStep })
  }

  uploadHandler() {
    return () => {}
  }
}

export default Engine
