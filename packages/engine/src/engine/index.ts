// types
import {
  ICreateEngineOptions,
  IEngineResolvers,
  IStepTransitionReturn,
  IExperienceProceedPayload,
  IExperienceDecisionCallbackFunction,
  IExperienceDecision,
  IExperienceDecisionAction,
  IExperienceDecisionOptions,
} from "../interfaces/IEngine"
import { IStepJSON } from "../types"

import JSONConfig from "../classes/JSONConfig"
import EngineError from "../classes/EngineError"

// handlers
import SessionHandler from "./handlers/SessionHandler"
import JSONHandler from "./handlers/JSONHandler"

// helpers
import computeExperienceMetadata from "../helpers/computeExperienceMetadata"
import validateStep from "../helpers/validateStep"
import getIsFieldsValidationNeeded from "../helpers/getIsFieldsValidationNeeded"
import errorHandler from "../helpers/errorHandler"

class Engine {
  private resolvers: IEngineResolvers
  private session: SessionHandler
  private json: JSONHandler

  constructor({
    experienceId,
    experienceJSONConfig,
    resolvers,
  }: ICreateEngineOptions) {
    this.resolvers = resolvers
    this.session = new SessionHandler(this.resolvers)
    this.json = new JSONHandler({
      resolvers,
      experienceJSONConfig,
      experienceId,
    })
  }

  private async setupEnvironment(sessionId: string | undefined) {
    await this.json.loadJSONConfig()
    this.checkResolvers()
    await this.session.loadSessionFromStorage(sessionId)
  }

  private checkResolvers() {
    if (!this.resolvers.hasOwnProperty("getSession")) {
      throw new EngineError(
        "resolverMissing",
        "getSession resolver is missing."
      )
    }
    if (!this.resolvers.hasOwnProperty("setSession")) {
      throw new EngineError(
        "resolverMissing",
        "setSession resolver is missing."
      )
    }
  }

  private async createTransitionReturn({
    processedData = {},
    returningStep,
    error,
  }: {
    returningStep?: IStepJSON
    error?: EngineError
    processedData?: any
  } = {}): Promise<IStepTransitionReturn> {
    const session = this.session.current
    const computedMetadata = this.json.config
      ? computeExperienceMetadata(this.json.config, session)
      : null
    // apply plugins
    // apply autofill
    return {
      sessionId: session?.sessionId || "",
      step: returningStep,
      capturedData: session?.steps || {},
      error: error || null,
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
    let stepToReturn: IStepJSON | undefined
    try {
      await this.setupEnvironment(payload?.sessionId)

      const session = this.session.current
      const visualizingStepSlug = session?.experienceState?.visualizingStepSlug

      stepToReturn = session
        ? this.json.getStepDefinition(visualizingStepSlug)
        : this.json.config?.getFirstStepFromFlow("default")

      if (!stepToReturn) {
        throw new EngineError(
          "stepNotFound",
          `Step ${visualizingStepSlug} not found on JSON config`
        )
      }

      return await this.createTransitionReturn({ returningStep: stepToReturn })
    } catch (err) {
      const formattedError = errorHandler(err)
      return await this.createTransitionReturn({
        error: formattedError,
        returningStep: stepToReturn,
      })
    }
  }

  async proceed(
    payload: IExperienceProceedPayload = {},
    decisionCB?: IExperienceDecisionCallbackFunction
  ): Promise<IStepTransitionReturn> {
    /**
     * Todo
     * - process returning definition
     * - webhook call
     * - experience hooks
     * - globals
     */

    let receivingStepDefinition: IStepJSON | undefined

    try {
      await this.setupEnvironment(payload?.sessionId)

      const session = this.session.current

      const receivingStepSlug = this.json.getReceivingStepSlug({ session })
      receivingStepDefinition = this.json.getStepDefinition(receivingStepSlug)

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
        throw new EngineError("fieldValidation", "JSON config validation", {
          invalidFields: validation.invalidFields,
        })
      }

      // decision point
      const decision = decisionCB
        ? await this.useDecisionCallback(decisionCB, payload)
        : ({} as IExperienceDecision)

      const processedData = decision?.options?.processedData || {}

      if (decision?.action === "blockProgression") {
        throw new EngineError(
          "blockProgressionDecision",
          decision?.options?.errors?.message ?? "Decision callback validation",
          decision.options?.errors
        )
      }

      if (isFirstStep && isStepFieldsValid) {
        const JSONConfig = this.json.config as JSONConfig
        await this.session.createSession(
          JSONConfig,
          decision?.options?.newFlow || "default"
        )
      }

      if (decision?.action === "changeFlow") {
        const newFlow = decision?.options?.newFlow || ""
        this.json.getFlow(newFlow)
        this.session.changeCurrentFlow(newFlow)
      }

      await this.session.addCompletedStep(receivingStepSlug, {
        fields: payload.fields,
      })

      const returningStepDefinition = this.json.getReturningStepDefinition(
        receivingStepSlug,
        session
      )
      const isLastStepOfFlow = !returningStepDefinition

      if (isLastStepOfFlow) {
        await this.session.completeExperience()
        return this.createTransitionReturn()
      }

      await this.session.setVisualizingStepSlug(returningStepDefinition.slug)
      return await this.createTransitionReturn({
        returningStep: returningStepDefinition,
      })
    } catch (err) {
      const error = errorHandler(err)
      return this.createTransitionReturn({
        error: error,
        returningStep: receivingStepDefinition,
      })
    }
  }

  async goBackHandler(
    payload: IExperienceProceedPayload
  ): Promise<IStepTransitionReturn> {
    let returningStep
    try {
      await this.setupEnvironment(payload?.sessionId)

      if (!this.session.current) {
        returningStep = this.json.config!.getFirstStepFromFlow()
        return this.createTransitionReturn({
          returningStep,
        })
      }

      const currentState = this.session.current.experienceState
      const visualizingStepSlug = currentState.visualizingStepSlug
      const currentFlow = this.json.getFlow(currentState.currentFlow)
      const visualizingStepIndex =
        currentFlow.stepsSlugs.indexOf(visualizingStepSlug)
      const previousStepSlug = currentFlow.stepsSlugs[visualizingStepIndex - 1]
      const hasPreviousStep = !!previousStepSlug

      if (hasPreviousStep) {
        returningStep = this.json.getStepDefinition(previousStepSlug)
        await this.session.setVisualizingStepSlug(previousStepSlug)
        return this.createTransitionReturn({ returningStep })
      } else {
        const returningStep = this.json.getStepDefinition(visualizingStepSlug)
        return this.createTransitionReturn({
          returningStep,
        })
      }
    } catch (err) {
      const formattedError = errorHandler(err)
      return await this.createTransitionReturn({
        error: formattedError,
        returningStep,
      })
    }
  }

  async debugHandler(stepSlug: string): Promise<IStepTransitionReturn> {
    const returningStep = this.json.getStepDefinition(stepSlug)
    return this.createTransitionReturn({ returningStep })
  }

  uploadHandler() {
    return () => {}
  }
}

export default Engine
